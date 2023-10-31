/*
Language: Apex
Author: David Schach <dschach@x2od.com>
Category: Salesforce, Force.com, Lightning Platform, Salesforce Platform
Website: https://developer.salesforce.com/
*/

/** @type LanguageFn */
export default function (hljs) {
  const regex = hljs.regex;
  const APEX_IDENT_RE = '[a-zA-Z][a-zA-Z_0-9]*';
  const APEX_IDENT_WORD_RE = '\\b' + APEX_IDENT_RE + '\\b';
  const WORD_PAREN = APEX_IDENT_RE + '(?=\\s*\\()';
  const ANNOTATION_RE = '@' + APEX_IDENT_RE;
  const PARENS_LOOKAHEAD = /(?=\s*\()/;
  const SPACE = /\s+/;

  /**
   * @param {...(RegExp | string) } args
   * @returns {string}
   */
  function arrayJoin(...args) {
    const joined = args.map((x) => source(x)).join('|');
    return joined;
  }

  /**
   * @param {...(RegExp | string) } args
   * @returns {string}
   */
  function negLookahead(...list) {
    return regex.concat('(?!', list.join('|'), ')');
  }

  const NUMBERS = {
    scope: 'number',
    variants: [
      {
        match: /\b[0-9]+(?:\.[0-9]+)?/
      },
      {
        match: /\s(?:[0-9,]+)?\.[0-9]+/
      },
      {
        // hex
        // 0b binary-digits integer-type-suffix[opt] OR 0B binary-digits integer-type-suffix[opt]
        match: /\b0(x|X)[0-9a-fA-F_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/
      },
      {
        // numeric binary
        match: /\b0(b|B)[01_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/
      },
      {
        // numeric decimal
        // decimal-digits . decimal-digits exponent-part[opt] real-type-suffix[opt] OR . decimal-digits exponent-part[opt] real-type-suffix[opt]
        match: /\b([0-9_]+)?\.[0-9_]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\b/
      },
      {
        // numeric decimal
        // decimal-digits exponent-part real-type-suffix[opt]
        match: /\b[0-9_]+(e|E)[0-9_]+(F|f|D|d|M|m)?\b/
      },
      {
        // numeric decimal
        // decimal-digits real-type-suffix
        match: /\b[0-9_]+(F|f|D|d|M|m)\b/
      },
      {
        // numeric decimal
        // decimal-digits integer-type-suffix[opt]
        match: /\b[0-9_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/
      }
    ],
    relevance: 0
  };

  const MAIN_KEYWORDS = [
    'trigger|10',
    'class',
    'interface',
    'abstract',
    'AccessLevel',
    'USER_MODE',
    'SYSTEM_MODE',
    'AccessType',
    'break',
    'cast',
    'catch',
    'continue',
    'default',
    'do',
    'else',
    'exports',
    'extends|6',
    'finally',
    'for',
    'get',
    'put',
    'set',
    'global',
    'if',
    'implements',
    'new',
    'newMap|10',
    'old|10',
    'oldMap|10',
    'operationType',
    'override',
    'private',
    'protected',
    'public',
    'return',
    'size',
    'static',
    'throws',
    'throw',
    'testmethod|10',
    'try',
    'virtual',
    'webservice',
    'when',
    'while'
  ];

  const LANGUAGE_VARS = ['final', 'instanceof', 'super', 'this', 'transient'];

  const LITERALS = ['false', 'true', 'null'];

  const TYPES = [
    'anytype',
    'blob|0',
    'boolean|0',
    'byte|0',
    'currency|0',
    'date|0',
    'datetime|0',
    'decimal|0',
    'double|0',
    'enum|0',
    'float|0',
    'integer|0',
    'long|0',
    'object',
    'pagereference|10',
    'selectoption|10',
    'short|0',
    'sobject|10',
    'string|0',
    'time|0',
    'void|0',
    'float|0'
  ];

  const BUILT_INS = ['finish', 'start', 'execute'];

  const DMLS = [
    'insert',
    'update',
    'upsert|8',
    'delete',
    'undelete',
    'merge',
    'convertLead|10'
  ];

  const IMPORTANT_WORDS = {
    beginKeywords: 'schedulable batchable queueable comparable callable',
    relevance: 10
  };

  // Extraneous for now - will be useful if we go this route BUT will need more maintenance
  /* const APEX_ANNOTATIONS = [
    '@AuraEnabled',
    '@Deprecated',
    '@Future',
    '@HttpDelete',
    '@HttpGet',
    '@HttpPatch',
    '@HttpPost',
    '@HttpPut',
    '@InvocableMethod',
    '@InvocableVariable',
    '@IsTest',
    '@JsonAccess',
    '@namespaceAccessible,',
    '@ReadOnly',
    '@RemoteAction',
    '@RestResource',
    '@SuppressWarnings',
    '@TestSetup',
    '@TestVisible'
  ]; */

  const KEYWORDS = {
    $pattern: '[A-Za-z][0-9A-Za-z$_]*',
    keyword: MAIN_KEYWORDS,
    'variable.language': LANGUAGE_VARS,
    built_in: BUILT_INS.concat(DMLS),
    type: TYPES,
    literal: LITERALS
  };

  const COMPOUND_KEYWORDS = {
    match: /\b(switch\s+on|as\s+user|as\s+system)\b/,
    relevance: 8,
    scope: 'keyword'
  };

  const NAMESPACE_LIST = [
    'ApexPages|10',
    'AppLauncher',
    'Approval',
    'Assert',
    'Auth',
    'Cache',
    'Canvas',
    'ChatterAnswers|10',
    'CommercePayments|10',
    'ConnectApi|10',
    'Database',
    'Datacloud|10',
    'Dataweave|10',
    'DataSource|10',
    'Dom',
    'EventBus|10',
    'ExternalService',
    'Flow',
    'Functions',
    'Invocable',
    'KbManagement|10',
    'Label',
    'LxScheduler|10',
    'Messaging',
    'Metadata',
    'Pref_center|10',
    'Process',
    'QuickAction',
    'Reports',
    'RichMessageing',
    'Savepoint',
    'SchedulableContext',
    'Schema',
    'Search',
    'Sfc|10',
    'Sfdc_Checkout|10',
    'sfdc_surveys|10',
    'Site',
    'Support',
    'System',
    'TerritoryMgmt|10',
    'Test',
    'Trigger|10',
    'TxnSecurity|10',
    'Type',
    'URL',
    'UserInfo',
    'UserManagement',
    'Version',
    'WebServiceCallout',
    'XmlStreamReader',
    'XmlStreamWriter'
  ];

  const SYSTEM_ENUMS = [
    'AccessType',
    'AccessLevel',
    'DomainType',
    'JSONToken',
    'LoggingLevel',
    'Quiddity',
    'TriggerOperation',
    'operationType'
  ];

  const BUILT_INS = [].concat(...NAMESPACE_LIST).concat(...SYSTEM_CLASSES);

  const LITERALS = ['false', 'true', 'null'];

  const OPERATORS = {
    match: regex.either(...OPERATOR_REGEX),
    scope: 'operator',
    relevance: 0
  };

  const NAMESPACES = {
    match: [/\b/, regex.either(...NAMESPACE_LIST), /(?=\.)/],
    scope: { 2: 'built_in' },
    relevance: 10
  };

  const PUNCTUATION_LIST = [
    ',',
    /(?<!=\?)(\.)/,
    ';',
    /(?<=\w)(\>)/,
    /(\<)(?=\w)/,
    /\{|\}/,
    /\(|\)/,
    /(\,?)-(?=\d)/ // number negative sign
  ];
  const PUNCTUATION = [
    { match: regex.either(...PUNCTUATION_LIST), scope: 'punctuation' }
  ];

  const COMMENT_LINE = hljs.COMMENT('//', /[$\n]/);

  const COMMENT_BLOCK = hljs.COMMENT('/\\*', '\\*/', {
    relevance: 0,
    contains: [
      {
        // eat up @'s in emails to prevent them to be recognized as doctags
        begin: /\w+@/,
        relevance: 0
      },
      {
        scope: 'doctag',
        begin: '@[A-Za-z_]+'
      },
      {
        begin: '`',
        end: '`',
        excludeBegin: true,
        excludeEnd: true,
        scope: 'code',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      hljs.inherit(hljs.APOS_STRING_MODE, { scope: 'string' })
    ]
  });

  const OPERATORS_RE = [
    /(?<!=|!)\=(?!=|>)/, // assignment
    /--/, // decrement
    /\+\+/, // increment
    /&&|\|\|/, // logical
    /\*=|\/=|%=|\+=|-=/, // assignment.compound
    /\&=|\^=|<<=|>>=|>>>=|\|=/, // assignment.compound.bitwise
    /\&|~|\^|\|/, // bitwise
    /%[^%]|\*[^\/]|\/[^\/\*]|(?<!\-)\-(?!\-)|(?<!\+)\+(?!\+)/, // arithmetic
    /<<|>>/, // bitwise.shift
    /<=|>=|\s(<|>)\s/, // relational
    /==|!=/, // comparison
    /=>/, // map assign
    /!(?=\w)/, // negator
    /\&\&/,
    /(?<=\s)(\?|:)(?=\s)/, // standalone ? or : (ternary operator?)
    /\?\./, // null-safe operator
    /(?<!\?)\?(?!\?|\.|\[)/ // ternary operator or CONDITIONAL_OPERATOR
  ];

  const OPERATORS = {
    match: regex.concat(
      negLookahead(...OPERATORS_RE),
      regex.either(...OPERATORS_RE),
      negLookahead(...OPERATORS_RE)
    ),
    scope: 'operator',
    relevance: 0
  };

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
      //returnEnd: true,
      scope: 'annotation',
      contains: [
        {
          match: [APEX_IDENT_WORD_RE, /\s*=/],
          scope: {
            2: 'operator'
          },
          contains: [OPERATORS]
        },
        hljs.inherit(hljs.APOS_STRING_MODE, { scope: 'string' }),
        NUMBERS
      ],
      keywords: {
        literal: LITERALS
      }
    }
  ];

  const EXCEPTION = [
    {
      // Various Apex Exception types
      match: /\b[a-zA-Z\d]*Exception\b/,
      scope: 'title.class',
      relevance: 0
    }
  ];

  const COLLECTION_REGEX = [
    // TODO: make a matcher for each type (map, list, set) with all the ways to initialize
    // * List<Type>
    // * Type[] <- array notation - dpme
    // * variable[0] - done
    // * Set<Type> - done
    // * Map<Type, Type>() <- allow for parens and for SOQL - done
    // * Map<Id, CustomObject__c> myMap = new Map<Id, CustomObject__c>(SOQL_QUERY); - done
    // * Map<Id, String> myMap = new Map<Id, String>{a => b, c => d} last bit contains string, etc.
    {
      scope: 'collection',
      begin: /\b(list|set|map)(?=\s*<)/,
      beginScope: 'type',
      end: /(?=\>+)/, // use lookahead so we don't scope the punctuation here.
      endScope: 'punctuation',
      //      returnEnd: true,
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
      match: [APEX_IDENT_WORD_RE, /\[/, /\d+/, /\]/],
      scope: { 1: 'variable', 2: 'punctuation', 3: 'number', 4: 'punctuation' }
    },
    {
      // type[] var = new type[]{values}
      match: [APEX_IDENT_RE, /\[\]/], // array notation
      scope: {
        1: 'keyword',
        2: 'title.class'
      },
      relevance: 0
    }
  ];

  const COLLECTION_MAP_VALUE = [
    {
      match: [
        regex.concat(/\b/, regex.either(...SYSTEM_ENUMS)),
        /\./,
        APEX_IDENT_RE,
        /(?![\.\(])/
      ],
      scope: { 1: 'built_in', 2: 'punctuation', 3: 'variable.constant' }, // TODO: Find a better scope for the enum value
      relevance: 0
    },
    {
      match: [
        /\b/,
        regex.either(...SYSTEM_CLASSES),
        /\./,
        APEX_IDENT_RE,
        regex.lookahead(/[\.\(\s]/)
      ],
      scope: { 2: 'built_in', 3: 'punctuation', 4: 'keyword' }
    },
    {
      match: regex.concat(
        regex.either(...NAMESPACE_LIST),
        regex.lookahead(/\./)
      ),
      scope: 'built_in'
    },
    {
      match: [
        regex.concat('(?<=', regex.either(...NAMESPACE_LIST), ')'),
        /\./,
        APEX_IDENT_RE,
        PARENS_LOOKAHEAD
      ],
      scope: { 3: 'keyword' }
    },

    {
      begin: regex.concat(/\b/, 'Trigger', /\b/),
      beginScope: 'built_in',
      end: [
        /\./,
        /(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size|operationType)\b(?!\.)/
      ],
      endScope: { 1: 'punctuation', 2: 'keyword' },
      relevance: 10
    },
    {
      begin: regex.concat(/\b/, 'Trigger', /\b/),
      beginScope: 'built_in',
      end: [/\./, APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD],
      endScope: { 1: 'punctuation', 2: 'title.function.invoke' },
      relevance: 0
    },
    {
      begin: regex.concat(/\b/, 'Trigger', /\b/),
      beginScope: 'built_in',
      end: [/\./, 'operationtype', /\./, APEX_IDENT_WORD_RE],
      endScope: { 1: 'punctuation', 2: 'keyword', 4: 'variable.constant' },
      relevance: 10
    }
  ];

  const COLLECTION_DECLARATION = [
    {
      match: [/\b(list|set|map)\s*/, '<', /[\.\w]+/],
      scope: { 1: 'type', 3: 'type' },
      relevance: 10
    },
    {
      match: [
        /(?<=\=\s*\()/,
        APEX_IDENT_RE,
        '(?=\\)\\s*' + APEX_IDENT_RE + ')'
      ],
      scope: {
        1: 'type'
      }
    }
  ];

  const CUSTOM_OBJECT = {
    // Custom fields, types, etc.
    match: [/[^\.]/, /\b[a-zA-Z][a-zA-Z\d_]*__[cxebr]\b/, /[\(\s;,]+/],
    scope: {
      2: 'type'
    },
    relevance: 10
  };

  const METHOD_CALL = {
    variants: [
      {
        beginKeywords: 'implements',
        end: /\bextends\b|\{/
        //scope: 'implements block'
      },
      {
        beginKeywords: 'extends',
        end: /\bimplements\b|\{/
        //scope: 'extends block'
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
          regex.either(...SYSTEM_INTERFACES),
          /\b\s*(?!>)/
        ),
        scope: 'title.class.inherited',
        relevance: 8
      }
    ]
  };

  const PARAMS_DECLARATION = {
    scope: 'params declaration', // NOTE: declaration
    begin: /\((?!\s*\[)/,
    //returnBegin: true,
    //beginScope: 'punctuation',
    end: /\)/,
    //endsParent: true,
    returnEnd: true,
    relevance: 0,
    keywords: {
      KEYWORDS
    },
    illegal: MAIN_KEYWORD_LIST,
    contains: [
      NUMBERS,
      hljs.APOS_STRING_MODE,
      COMMENT_LINE,
      COMMENT_BLOCK,
      COLLECTION_REGEX,
      NAMESPACES,
      { match: /\,/, scope: 'punctuation' },
      SALESFORCE_ID,
      /* {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: regex.concat(
          /(?<=[\s\(])/,
          APEX_IDENT_RE,
          regex.lookahead(regex.concat(SPACE, APEX_IDENT_RE, /\s*[,)]/))
        ),
        scope: 'variable'
      }, */
      {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: [SPACE, APEX_IDENT_RE, /\s*(?=[,)])/],

        scope: { 2: 'variable' }
      }
    ]
  };

  const METHOD_DECLARATION = {
    // method declaration
    match: [/(?!new)(?<=(\<|\>|\w|_))\s+/, APEX_IDENT_RE, PARENS_LOOKAHEAD],
    scope: { 2: 'title.function' },
    relevance: 0,
    starts: PARAMS_DECLARATION
  };

  const DECLARATIONS = [
    {
      // trigger declaration
      begin: [
        /\btrigger/,
        SPACE,
        APEX_IDENT_RE,
        SPACE,
        'on',
        SPACE,
        APEX_IDENT_RE
      ],
      beginScope: {
        1: 'keyword',
        3: 'title.class',
        5: 'operator',
        7: 'type'
      },
      end: /(?=\{)/,
      returnEnd: true,
      //scope: 'trigger_declaration',
      contains: [
        COMMENT_LINE,
        COMMENT_BLOCK,
        {
          begin: /\(/,
          end: /\)/,
          contains: [
            {
              match:
                /\b(before|after)\s+(insert|update|delete|merge|undelete)\b/,
              scope: 'built_in'
            }
          ]
        }
      ]
    },
    {
      // class sharing
      relevance: 10,
      match: /\b(with|without|inherited)\s+sharing\b/,
      scope: 'keyword'
    },
    {
      // class declaration
      begin: [/[^\.]/, /\bclass\b/],
      beginScope: { 2: 'keyword' },
      end: /(?=\{)/,
      //scope: 'class_declaration',
      keywords: { type: TYPES, keyword: MAIN_KEYWORD_LIST },
      contains: [
        {
          match: [/(?<=\bclass)\s+/, APEX_IDENT_RE],
          scope: { 2: 'title.class' }
        },
        EXTEND_IMPLEMENT
      ]
    },
    {
      // Constructor
      // Matches public/privatE/protected methodname parens
      match: [/(public|private|protected)\s+/, APEX_IDENT_RE, PARENS_LOOKAHEAD],
      scope: {
        1: 'keyword',
        2: 'constructor'
      },
      starts: PARAMS_DECLARATION
    },
    METHOD_DECLARATION,
    {
      // enum declaration
      begin: [/\benum\s+/, APEX_IDENT_RE, /\s*(?=\{)/],
      beginScope: { 2: 'type' },
      end: /(?=[\}\n])/,
      //returnEnd: true,
      //scope: 'enum_declaration',
      relevance: 0,
      contains: [
        COMMENT_LINE,
        COMMENT_BLOCK,
        PUNCTUATION,

        {
          match: regex.concat(APEX_IDENT_WORD_RE),
          scope: 'variable.constant'
        }
      ]
    }
  ];

  const SWITCH_STATEMENT = {
    match: [/\bswitch\s+on\s+/, APEX_IDENT_RE],
    scope: { 1: 'keyword', 2: 'variable' }
  };

  /**
   * SOQL SECTION
   */

  const SOQL_KEYWORDS = [
    'ABOVE_OR_BELOW',
    'ABOVE',
    'ACTIVE',
    'ADVANCED',
    'ALL',
    /ALL\s+FIELDS/,
    'AND',
    'ANY',
    'ARRAY',
    'AS',
    'ASC',
    'BY',
    'CATEGORY',
    'CONTAINS',
    'COUNT',
    'COUNT_DISTINCT',
    'SUM',
    'MAX',
    'MIN',
    'HOUR_IN_DAY',
    'CONVERTCURRENCY',
    'CUBE',
    'DATA',
    'DESC',
    'DIVISION',
    'END',
    'EXCLUDES',
    'FIELDS',
    'FIND|10',
    'FIRST',
    'FOR',
    'FROM',
    /GROUP\s+BY/,
    'HAVING',
    'INCLUDES',
    'LAST',
    'LAST_90_DAYS',
    'LAST_MONTH',
    'LAST_N_DAYS',
    'LAST_WEEK',
    'LAST',
    'LIKE',
    'LIMIT',
    'NETWORK',
    'NEXT_90_DAYS',
    'NEXT_MONTH',
    'NEXT_N_DAYS',
    'NEXT_WEEK',
    'NULLS',
    'OFFSET',
    'ON',
    'OR',
    /ORDER\s+BY/,
    'REFERENCE',
    'RETURNING',
    'ROLLUP',
    'ROWS',
    'SEARCH',
    'SECURITY_ENFORCED',
    'SELECT',
    'SNIPPET',
    'SORT',
    'THIS_MONTH',
    'THIS_WEEK',
    'TODAY',
    'TOLABEL',
    'TOMORROW',
    'TRACKING',
    'TYPEOF',
    'UPDATE',
    /USING\s+SCOPE/,
    'VIEW',
    'VIEWSTAT',
    'VIEWSTATE',
    'WHERE',
    'WITH',
    'YESTERDAY',
    'USER_MODE'
  ];

  const SOQL_QUERY = {
    begin: /\[[\s\n]*(?=(SELECT|FIND))/,
    end: /\]/,
    scope: 'subst',
    relevance: 10,
    endsWithParent: true,
    keywords: {
      keyword: []
        .concat(...KEYWORDS.keyword)
        .concat(...SOQL_KEYWORDS)
        .concat(...SOQL_OPERATORS), // * orange italic
      type: SOQL_FUNCTIONS, // * blue italic
      literal: [].concat(...SOQL_DATES).concat(...KEYWORDS.literal),
      built_in: BUILT_INS
      //attr: SOQL_OPERATORS
    },
    contains: [
      {
        begin: /SELECT\b/,
        beginScope: 'keyword',
        //returnBegin: true,
        ends: /(?=\bFROM\b)/,
        returnEnd: true,
        scope: 'select clause',
        contains: [
          {
            match: [SPACE, APEX_IDENT_RE, SPACE],
            scope: { 2: 'variable' }
          }
          /* {
            match: [SPACE, APEX_IDENT_RE, /(?=\,)/],
          scope: 'params'} */
        ]
      },
      {
        begin: [/\bFROM\s/, APEX_IDENT_WORD_RE],
        beginScope: {
          1: 'keyword',
          2: 'type'
        },
        relevance: 10
      },
      NUMBER,
      METHOD_CALL,
      hljs.APOS_STRING_MODE
    ],
    illegal: '::'
  };

  const APEX_DECLARATIONS = [
    {
      match: [/\b(?<=enum|\bnew)/, /\s+/, APEX_IDENT_RE, /\s*(?=[{()])/],
      scope: {
        3: 'type'
      },
      contains: [COMMENT_LINE, COMMENT_BLOCK] // , CUSTOM_OBJECT
    },
    // Class Name
    {
      match: [/(?<=\bclass\b)/, /\s+/, APEX_IDENT_RE],
      scope: {
        //1: 'keyword',
        3: 'title.class'
      }
    },
    // Constructor
    {
      match: [
        /(?<=(public|private))/,
        /\s+/,
        APEX_IDENT_RE,
        /(?=\s*\(.*\)\s*{)/
      ], // /(?=\s*\()/],
      scope: {
        3: 'constructor'
      }
    },
    // Trigger
    {
      begin: [
        /(?<=\btrigger\b)/,
        /\s+/,
        APEX_IDENT_RE,
        /\s+/,
        'on',
        /\s+/,
        APEX_IDENT_RE
      ],
      end: '{',
      scope: {
        //1: 'keyword',
        3: 'title.class',
        7: 'type'
      },
      contains: [
        COMMENT_LINE,
        COMMENT_BLOCK,
        {
          match: /(?:before|after)\s+(?:insert|update|delete|undelete)/,
          scope: 'built_in',
          relevance: 10
        }
      ],
      relevance: 10
    },
    // Method declarations
    /* begin: [
        '(?:' + APEX_IDENT_RE + '\\s+)',
        '(?:' + APEX_IDENT_RE + '\\s+)',
        hljs.UNDERSCORE_IDENT_RE,
        /(?=\s*\()/
      ],
      scope: { 2: 'type', 3: 'title.function' }, */
    /* {
      begin: [
        /((?:public|private|protected|global))?\s* /,
        /((?:static|override))?\s* /,
        /((?:static|override))?\s* /,
        '(?:' + APEX_FULL_TYPE_RE + ')\\s+',
        APEX_IDENT_RE,
        /(?=\s* \()/
      ],
      scope: {
        1: 'keyword',
        2: 'keyword',
        3: 'keyword',
        //4: 'type',
        5: 'title.function'
      },
      keywords: KEYWORDS,

      contains: [
        COMMENT_LINE,
        COMMENT_BLOCK,
        hljs.APOS_STRING_MODE,
        COLLECTION_DECLARATION,
        COLLECTION_MAP_VALUE
      ],
      relevance: 0,
      illegal: [/\b_/, /_\b/]
    }, */
    // extending
    {
      match: [/(?:extends)/, /\s+/, APEX_IDENT_RE],
      scope: {
        3: 'title.class.inherited'
      },
      illegal: [/\b_/, /_\b/]
    }
  ];

  const MERGE_FIELDS = {
    begin: ['{', /\$[a-zA-Z]+]/, '.', /\w+/],
    end: '}',
    scope: {
      2: 'built_in',
      4: 'property'
    }
  };

  const FOR_LOOP = {
    variants: [
      {
        //for (APTask__c apTask : myTasks
        match: [
          /\bfor\b/,
          /\s*\(/,
          APEX_IDENT_RE,
          /\s+/,
          APEX_IDENT_RE,
          /\s+:/,
          /(?=\s*\[)/
        ],
        scope: {
          1: 'keyword',
          3: 'type'
          //5: 'variable'
        }
      },
      {
        match: [
          /\bfor\b/,
          /\s*\(/,
          APEX_IDENT_RE,
          /\s+/,
          APEX_IDENT_RE,
          /\s+:/,
          /\s*/,
          APEX_IDENT_RE
        ],
        scope: {
          1: 'keyword',
          3: 'type',
          //5: 'variable',
          8: 'variable'
        }
      }
    ],
    contains: [COMMENT_LINE, COMMENT_BLOCK, SOQL_QUERY]
  };

  const ASSIGNMENTS = [
    {
      match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s+/, /=/],
      scope: {
        1: 'type',
        3: 'variable',
        5: 'operator'
      },
      relevance: 0
    },
    {
      match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s+/, ';'],
      scope: {
        1: 'type',
        3: 'variable'
      },
      relevance: 0
    },
    {
      match: [/\s+/, APEX_IDENT_RE, /\s+/, /=/],
      scope: {
        2: 'variable',
        4: 'operator'
      },
      relevance: 0
    },
    {
      match: [/(?<=\w+\s+=\s+\()/, APEX_IDENT_RE, /(?=\))/],
      scope: {
        2: 'type'
      },
      relevance: 0
    }
  ];

  const SALESFORCE_ID = {
    match: /(?<!\.)\bId\b/,
    scope: 'type',
    relevance: 8
  };

  const ILLEGALS = [
    '</',
    '<#',
    '<]',
    '<div>',
    '<!--',
    '!DOCTYPE',
    /<iframe\b/,
    /^#/,
    /^import \.[a-zA-Z]+\./,
    /^import [\w]+/,
    /^import$/,
    /^include </,
    /^use\s+</,
    /\b(const|var)\s+\w+\s*=/,
    /\bstruct\b/,
    'System.log',
    'console.log',
    /\bfor\s+\w+\s+IN\s+/,
    /\bif\s+\w+\s+IN\s+/,
    /\bend\s+if\b/,
    /\bend\s+select\b/,
    /\b(int|var)\s+\w+\s+=/,
    /\b(int[0-9]+|bool)\b/,
    /\b\$/,
    '::=',
    /\s#[a-zA-Z]/,
    /\s_[a-zA-Z]/,
    /\s\$[a-zA-Z]/,
    '#if',
    '%if',
    /\bif(?!\s+\()/, //coffeescript
    '%endif',
    '#endif',
    /\w::\w/,
    /RETURNING\s+\*/,
    /\bint\b/,
    /import\s+\w+\s+=\s+require\("\w+"\)/,
    '/^include\b/',
    /\buse\s+strict\b/,
    /\w+\s+=\s+"\S*";/,
    /\/include\//,
    /\Anamespace\b/,
    /\bend\.\n/,
    /\bend\n/,
    '"""'
    // /"[^"]+"/, // Quote_string_mode
    // /@\w+\[\w+\]/ //moonscript
  ];

  return {
    name: 'Apex',
    aliases: ['apex', 'lightning'],
    case_insensitive: true, // language is case-insensitive
    disableAutodetect: false,
    ignoreIllegals: false,
    keywords: KEYWORDS,
    illegal: ILLEGALS,
    contains: [
      ANNOTATIONS,
      APEX_DECLARATIONS,
      ASSIGNMENTS,
      CLASS_SHARING,
      COLLECTION_DECLARATION,
      COLLECTION_MAP_VALUE,
      COMMENT_BLOCK,
      COMMENT_LINE,
      COMPOUND_KEYWORDS,
      //CUSTOM_OBJECT,
      EXCEPTION,
      FOR_LOOP,
      hljs.APOS_STRING_MODE,
      METHOD_CALL,
      MERGE_FIELDS,
      NAMESPACES,
      NUMBER,
      OPERATORS,
      SALESFORCE_ID,
      SOQL_QUERY,
      //ANNOTATION_ATTRIBUTE_PARAMS,
      IMPORTANT_WORDS
    ]
  };
}
