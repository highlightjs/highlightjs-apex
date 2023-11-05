/*
Language: Apex
Author: David Schach <dschach@x2od.com>
Category: Salesforce, Force.com, Salesforce Platform, Einstein 1 Platform
Website: https://developer.salesforce.com/
*/

import * as apex from './apexlib.js';

/** @type LanguageFn */
export default function (hljs) {
  const regex = hljs.regex;
  const APEX_IDENT_RE = apex.APEX_IDENT_RE;
  const APEX_IDENT_WORD_RE = apex.APEX_IDENT_WORD_RE;
  const ANNOTATION_RE = '@' + APEX_IDENT_RE;
  const SPACEPARENS_LOOKAHEAD = '(?=\\s*\\()'; //(?=\s*\()/;
  const PARENS_LOOKAHEAD = /(?=\()/; //'(?=\\()';
  const SPACE = /\s+/;

  const PUNCTUATION = {
    match: regex.either(...apex.PUNCTUATION_LIST),
    scope: 'punctuation',
    relevance: 0
  };

  const OPERATORS = {
    match: regex.concat(
      /(?<=\W|\b|\s)/,
      regex.either(...apex.OPERATORS_RE),
      //negLookaheadAny(...apex.OPERATORS_RE)
      /(?=\W|\b|\s)/
    ),
    scope: 'operator',
    relevance: 0
  };
  const NUMBERS = {
    scope: 'number',
    match: regex.either(...apex.NUMBERS_RE),
    relevance: 0
  };

  const KEYWORDS = {
    $pattern: '(?<!\\.)' + APEX_IDENT_WORD_RE,
    keyword: apex.KEYWORD_LIST.concat(...apex.STORAGE_MODIFIER_LIST).concat(
      ...apex.DMLS
    ),
    'variable.language': apex.LANGUAGE_VAR_LIST,
    built_in: apex.BUILT_INS,
    type: apex.TYPES,
    literal: apex.LITERALS
  };

  /**
   * @param {...(RegExp | string) } args
   * @returns {string}
   */
  function negLookaheadAny(...list) {
    return regex.concat('(?!', list.join('|'), ')');
  }

  const LANGUAGE_VARS_RE = {
    match: regex.concat(/\b/, regex.either(...apex.LANGUAGE_VAR_LIST), /\b/),
    scope: 'variable.language',
    relevance: 0
  };

  const NAMESPACES = [
    {
      match: [
        regex.concat(/\b/, regex.either(...apex.SYSTEM_ENUMS)),
        /\./,
        APEX_IDENT_RE,
        /(?![\.\(])/
      ],
      scope: { 1: 'built_in', 2: 'punctuation', 3: 'variable.constant' }, // TODO: Find a better scope for the enum value
      relevance: 0
    },
    {
      match: regex.concat(
        /\b/,
        regex.either(...apex.NAMESPACE_LIST),
        regex.concat('\b(?!\\.', regex.either(...apex.SYSTEM_CLASSES), ')')
      ),
      scope: 'built_in',
      relevance: 0
    },
    {
      // System and its classes
      match: [
        /\b/,
        'System',
        /\./,
        regex.either(...apex.SYSTEM_CLASSES),
        /(?=\.)/
      ],
      scope: { 2: 'built_in', 3: 'punctuation', 4: 'built_in' },
      relevance: 5
    },
    {
      match: [
        regex.concat('(?<=\\b', regex.either(...apex.BUILT_INS), ')'),
        /\./,
        APEX_IDENT_RE,
        regex.lookahead(/[\(\s]/)
      ],
      scope: { 2: 'punctuation', 3: 'keyword' },
      relevance: 0
    },
    {
      begin: regex.concat(/\b/, 'Trigger', /\b/),
      beginScope: 'built_in',
      variants: [
        {
          end: [
            /\./,
            /(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size|operationType)\b(?!\.)/
          ],
          endScope: { 1: 'punctuation', 2: 'keyword' },
          relevance: 10
        },
        {
          end: [/\./, 'operationtype', /\./, APEX_IDENT_WORD_RE],
          endScope: {
            1: 'punctuation',
            2: 'keyword',
            3: 'punctuation',
            4: 'variable.constant'
          },
          relevance: 10
        }
      ]
    }
  ];

  const STRINGS = hljs.inherit(hljs.APOS_STRING_MODE, {
    contains: [{ match: /\\'/, scope: 'literal' }],
    scope: 'string',
    relevance: 0
  });

  const COMMENT_LINE = hljs.COMMENT('//', /[$\n]/, {
    relevance: 0
  });

  const COMMENT_BLOCK = hljs.COMMENT('/\\*', '\\*/', {
    relevance: 0,
    contains: [
      {
        // eat up @'s in emails to prevent them to be recognized as doctags
        begin: /\w+@/,
        relevance: 0
      },
      {
        match: [/@(?:exception|throws)/, SPACE, APEX_IDENT_RE],
        scope: { 1: 'doctag', 3: 'title.class' },
        relevance: 0
      },
      {
        begin: '@[A-Za-z_-]+',
        scope: 'doctag',
        relevance: 0
      },
      {
        match: [/(?<=@param)\s+/, APEX_IDENT_RE],
        scope: { 2: 'variable' },
        relevance: 0
      },
      {
        begin: '`',
        end: '`',
        beginScope: 'hidden',
        endScope: 'hidden',
        scope: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      }
    ]
  });

  const COMMENTS = [COMMENT_BLOCK, COMMENT_LINE];

  const ANNOTATIONS = [
    // We allow any annotation, so we do not need to maintain a list
    {
      /* 
      Type 1: one annotation
      @isTest 
      */
      match: regex.concat(ANNOTATION_RE, /\b(?!\s*\()/),
      scope: 'meta'
    },
    /* 
    Type 2: annotation and parentheses
    @SuppressWarnings('PMD.AvoidGlobalModifier'))
    Type 3: annotation on one line and parentheses on next
    @IsTest
    (Seealldata=true) 
    */
    {
      begin: [regex.concat(ANNOTATION_RE, /\b/), /\s*/, /\(/],
      beginScope: { 1: 'meta', 3: 'punctuation' },
      end: /(?=\))/,
      //scope: 'clause: annotation',
      contains: [
        {
          match: [APEX_IDENT_WORD_RE, /\s*=/],
          scope: {
            1: 'variable',
            2: 'operator'
          },
          contains: [OPERATORS]
        },
        STRINGS,
        NUMBERS
      ],
      keywords: {
        literal: apex.LITERALS
      }
    }
  ];

  const COLLECTIONS = [
    {
      //scope: 'clause: collection',
      begin: /\b(list|set|map)(?=\s*<)/,
      beginScope: 'type',
      end: /\>+/,
      endScope: 'punctuation',
      contains: [
        { match: /\<|,/, scope: 'punctuation' },
        {
          match: APEX_IDENT_WORD_RE,
          scope: 'type'
        }
      ],
      relevance: 8
    },
    {
      // array reference (only has integer in array)
      match: [
        regex.optional(APEX_IDENT_WORD_RE),
        /\[/,
        regex.optional(/\d+/),
        /\]/
      ],
      scope: { 1: 'variable', 2: 'punctuation', 3: 'number', 4: 'punctuation' }
    },
    {
      // type[] var = new type[]{values}
      match: [APEX_IDENT_RE, /\[\]/], // array notation
      scope: {
        1: 'type',
        2: 'punctuation'
      },
      relevance: 0
    }
  ];

  const MISCELLANEOUS = [
    {
      // mynum =
      // could also be a collection variable
      match: [/(?<!\.)\b/, APEX_IDENT_RE, /\s*(?=\=[^\>])/],
      scope: { 2: 'variable' },
      relevance: 0
    },
    // Casting
    {
      match: [/(?<=\=\s*\()/, APEX_IDENT_RE, '(?=\\)\\s*' + APEX_IDENT_RE + ')'],
      scope: {
        2: 'type'
      },
      relevance: 0
    }
  ];

  const PARAMS_CALL = {
    //scope: 'clause: params call',
    begin: /\((?!(\s*\[))/,
    beginScope: 'punctuation',
    end: /\)/,
    endScope: 'punctuation',
    relevance: 0,
    keywords: {
      KEYWORDS
    },
    illegal: apex.KEYWORD_LIST,
    contains: [
      STRINGS,
      apex.INSTANTIATE_TYPE,
      COMMENTS,
      OPERATORS,
      COLLECTIONS,
      NAMESPACES,
      NUMBERS,
      apex.SALESFORCE_ID,
      {
        keywords: { KEYWORDS },
        // mymethod(var1, var2); comma-separated list
        // must be followed by comma or paren
        match: regex.concat(
          /(?<=\s|\(|\,)/,
          negLookaheadAny(...apex.LITERALS),
          APEX_IDENT_RE,
          /\b/,
          /(?!\.)/
        ),
        scope: 'variable'
      },
      { match: /\,|\./, scope: 'punctuation' }
    ]
  };

  const EXTEND_IMPLEMENT = {
    returnEnd: true,
    endsWithParent: true,
    variants: [
      {
        beginKeywords: 'implements',
        end: /\bextends\b|\{/
        //scope: 'clause: implements block'
      },
      {
        beginKeywords: 'extends',
        end: /\bimplements\b|\{/
        //scope: 'clause: extends block'
      }
    ],
    contains: [
      NAMESPACES,
      {
        match: [APEX_IDENT_WORD_RE, /\./, APEX_IDENT_RE, /(?=[,\s<])/],
        scope: { 1: 'built_in', 3: 'title.class.inherited' }
      },
      {
        match: regex.concat(APEX_IDENT_WORD_RE, /(?=>)/),
        scope: 'type'
      },
      {
        match: regex.concat(APEX_IDENT_WORD_RE, /(?!<)/),
        scope: 'title.class.inherited'
      },
      {
        match: regex.concat(
          /\b/,
          regex.either(...apex.SYSTEM_INTERFACES),
          /\b\s*(?!>)/
        ),
        scope: 'title.class.inherited',
        relevance: 8
      }
    ],
    relevance: 0
  };

  const PARAMS_DECLARATION = {
    scope: 'params declare', // NOTE: declaration
    end: /\)/,
    endScope: 'punctuation',
    relevance: 0,
    keywords: {
      KEYWORDS
    },
    illegal: apex.KEYWORD_LIST,
    contains: [
      NUMBERS,
      apex.SALESFORCE_ID,
      STRINGS,
      COMMENTS,
      COLLECTIONS,
      NAMESPACES,
      { match: /\,|\(/, scope: 'punctuation' },
      {
        match: [/(?<=\(|\,)\s*/, APEX_IDENT_RE, /(?=\s)/],
        scope: { 2: 'type' }
      },
      {
        // mymethod(Date myDate, Date yourDate); highlights second part of each parameter
        // must be followed by comma or paren
        match: [SPACE, APEX_IDENT_RE, /\s*(?=[,)])/],

        scope: { 2: 'variable' }
      }
    ]
  };

  const DECLARATIONS = [
    {
      // trigger declaration
      begin: [/\btrigger/, SPACE, APEX_IDENT_RE, SPACE, 'on', SPACE, APEX_IDENT_RE],
      beginScope: {
        1: 'keyword',
        3: 'title.class',
        5: 'operator',
        7: 'type'
      },
      end: /(?=\{)/,
      returnEnd: true,
      //scope: 'clause: trigger_declaration',
      contains: [
        COMMENTS,
        {
          begin: /\(/,
          beginScope: 'punctuation',
          end: /\)/,
          endScope: 'punctuation',
          contains: [
            {
              match:
                /\b(before|after)\s+(insert|update|delete|merge|undelete)\b/,
              scope: 'built_in',
              relevance: 5
            }
          ]
        }
      ]
    },
    apex.CLASS_SHARING,
    {
      // class declaration
      begin: [/[^\.]/, /\bclass\b/],
      beginScope: { 2: 'keyword' },
      end: /(?=\{)/,
      relevance: 0,
      //scope: 'clause: class_declaration',
      keywords: { type: apex.TYPES, keyword: apex.KEYWORD_LIST },
      contains: [
        {
          match: [/(?<=\bclass)\s+/, APEX_IDENT_RE],
          scope: { 2: 'title.class' }
        },
        EXTEND_IMPLEMENT
      ]
    },
    {
      // * Constructor DECLARATION
      // Matches public/private/protected methodname parens
      match: [
        /(public|private|protected)\s+/,
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ],
      scope: {
        1: 'keyword',
        2: 'title.function'
      },
      starts: PARAMS_DECLARATION,
      relevance: 0
    },
    {
      // * method declaration
      match: [
        /(?<!new)(?<!return)(?<=\<|\>|\w)\s+/,
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ],
      scope: { 2: 'title.function' },
      relevance: 0,
      starts: PARAMS_DECLARATION
    },
    {
      // enum declaration
      begin: [/\benum\s+/, APEX_IDENT_RE, /\s*(?=\{)/],
      beginScope: { 2: 'type' },
      end: /(?=[\}\n])/,
      //scope: 'enum_declaration',
      relevance: 0,
      contains: [
        COMMENTS,
        PUNCTUATION,

        {
          match: regex.concat(APEX_IDENT_WORD_RE),
          scope: 'variable.constant'
        }
      ]
    }
  ];

  const METHOD_CALL = [
    {
      match: regex.concat(
        negLookaheadAny(...apex.KEYWORD_LIST),
        /\b/,
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ),
      scope: 'title.function.invoke method_call',
      starts: PARAMS_CALL,
      relevance: 0
    },
    {
      match: [
        regex.concat('(?<!\\b', regex.either(...apex.BUILT_INS), ')'),
        /\./,
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ],
      scope: { 2: 'punctuation', 3: 'title.function.invoke dot' },
      starts: PARAMS_CALL,
      relevance: 0
    }
  ];

  /**
   * SOQL SECTION
   */

  const SOQL_QUERY = {
    begin: [/\[/, /\s*/, /(?=(SELECT|FIND)\b)/],
    beginScope: { 1: 'punctuation' },
    end: /\]/,
    endScope: 'punctuation',
    scope: 'soql',
    relevance: 10,
    endsWithParent: true,
    keywords: {
      keyword: []
        .concat(...KEYWORDS.keyword)
        .concat(...apex.SOQL_RESERVED)
        .concat(...apex.SOQL_OPERATORS), // * orange italic
      type: apex.SOQL_FUNCTIONS, // * blue italic
      'title.function': apex.SOQL_DATE_FUNCTIONS, // * blue normal
      literal: KEYWORDS.literal,
      built_in: apex.BUILT_INS
    },
    contains: [
      {
        begin: /\bSELECT\b/,
        beginScope: 'keyword',
        //beginKeyword: 'SELECT',
        end: /\bFROM\b/,
        returnEnd: true,
        //scope: 'clause: select',
        contains: [
          PUNCTUATION,
          {
            match: [/(?=[\s\,])/, APEX_IDENT_RE, /(?=[\s\,])/],
            scope: { 2: 'subst' }
          } // * back to main text color
        ]
      },
      {
        begin: [/\bFROM/, SPACE, APEX_IDENT_WORD_RE],
        beginScope: {
          1: 'keyword',
          3: 'type'
        },
        //scope: 'clause: from_clause',
        end: /(?=\]|\s|\))/,
        contains: [
          {
            match: [/(?<=\.)/, APEX_IDENT_WORD_RE],
            scope: { 2: 'type' }
          }
        ]
      },
      {
        match: /:/,
        scope: 'operator'
      },
      {
        match:
          /(NEXT|LAST|THIS)_(90_DAY|DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S?\b/,
        scope: 'keyword',
        relevance: 10
      },
      {
        match: [
          /(NEXT|LAST)_N_(DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S/,
          /\s*:\s*/,
          /\d+/
        ],
        scope: {
          1: 'keyword',
          2: 'operator',
          3: 'number'
        },
        relevance: 10
      },
      {
        match: [/(?<=:)/, /\s*/, APEX_IDENT_RE],
        scope: { 3: 'variable' }
      },
      NUMBERS,
      METHOD_CALL,
      OPERATORS,
      STRINGS,
      PUNCTUATION
    ],
    illegal: '::'
  };

  const FOR_LOOP = {
    begin: [/\bfor\b\s*/, /\(/, APEX_IDENT_RE, SPACE, APEX_IDENT_RE, /\s*/, /:/],
    beginScope: {
      2: 'punctuation',
      3: 'type',
      5: 'variable',
      7: 'operator'
    },
    end: /(?=\{)/,
    //scope: 'clause: for_loop',

    contains: [
      COMMENTS,
      SOQL_QUERY,
      METHOD_CALL,
      {
        match: regex.concat(APEX_IDENT_RE, /\b(?!\()/),
        scope: 'variable'
      },
      {
        match: regex.concat(APEX_IDENT_WORD_RE, SPACEPARENS_LOOKAHEAD),
        scope: 'title.function.invoke for_loop'
      },
      {
        match: /\{/,
        endsParent: true
      },
      OPERATORS,
      NUMBERS,
      PUNCTUATION
    ]
  };

  const DML_OPERATIONS = [
    /*
     * DML types
     * naked - delete as system [SELECT Id FROM Account];
     * naked - insert a;
     */
    {
      match: [
        regex.concat(/\b/, regex.either(...apex.DMLS)),
        /\s+(?!\()/,
        regex.optional(/as\s+(user|system)\b/)
      ],
      scope: { 3: 'keyword' }
    },
    /*
     * DML types
     * Database - Database.insert( );
     *
     */
    {
      begin: [
        /\bDatabase\b/,
        /\./,
        regex.either(...apex.DMLS),
        SPACEPARENS_LOOKAHEAD
      ],
      beginScope: {
        1: 'built_in',
        2: 'punctuation',
        3: 'keyword invoke_database'
      },
      starts: PARAMS_CALL
    }
  ];

  return {
    name: 'Apex',
    aliases: ['apex', 'lightning', 'soql'],
    case_insensitive: true, // language is case-insensitive
    disableAutodetect: false,
    ignoreIllegals: false,
    keywords: KEYWORDS,
    illegal: apex.ILLEGALS,
    contains: [
      ANNOTATIONS,
      MISCELLANEOUS,
      COLLECTIONS,
      COMMENTS,
      DECLARATIONS,
      DML_OPERATIONS,
      apex.EXCEPTION,
      FOR_LOOP,
      STRINGS,
      apex.INSTANTIATE_TYPE,
      LANGUAGE_VARS_RE,
      METHOD_CALL,
      NAMESPACES,
      NUMBERS,
      OPERATORS,
      PUNCTUATION,
      apex.SALESFORCE_ID,
      SOQL_QUERY,
      apex.SWITCH_STATEMENT
    ]
  };
}
