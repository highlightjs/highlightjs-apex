/*
Language: Apex
Author: David Schach <dschach@x2od.com>
Category: Salesforce, Force.com, Salesforce Platform, Einstein 1 Platform
Website: https://developer.salesforce.com/
*/

/** @type LanguageFn */
export default function (hljs) {
  const regex = hljs.regex;

  const APEX_IDENT_RE = '[a-zA-Z][a-zA-Z_0-9]*';
  const APEX_IDENT_WORD_RE = '\\b' + APEX_IDENT_RE + '\\b';
  const ANNOTATION_RE = '@' + APEX_IDENT_RE;
  const PARENS_LOOKAHEAD_RE = /(?=\s*\()/;
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
    match: regex.either(
      /\b(\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{1,3})?(\-|\+)\d{2}\:\d{2})\b/, //datetime
      /\b(\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{1,3})?(Z)?)\b/, //datetime
      /\b(\d{4}\-\d{2}\-\d{2})\b/, //date
      /\b0(x|X)[0-9a-fA-F_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //hex
      /\b0(b|B)[01_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //binary
      /\b([0-9]+)?\.[0-9]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\b/, //decimal
      /(-?)\b[0-9]+(e|E)[0-9]+(F|f|D|d|M|m)?\b/, //decimal
      /(-?)\b[0-9]+(F|f|D|d|M|m)\b/, //decimal
      /(-?)\b[0-9]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //decimal
      /(-?)(\b0[0-9]+|(\b\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)/ // C_NUMBER_MODE
    ),
    relevance: 0
  };

  // keyword
  const MAIN_KEYWORD_LIST = [
    'try',
    'catch',
    'finally',
    'get',
    'set',
    'put',
    'if',
    'for',
    'else',
    'do',
    'while',
    'continue',
    'break',
    'implements',
    'extends',
    'return',
    'throw',
    'when',
    'new'
  ];

  const LANGUAGE_VAR_LIST = ['instanceof', 'super', 'this'];

  const LANGUAGE_VARS_RE = {
    match: regex.concat(/\b/, regex.either(...LANGUAGE_VAR_LIST), /\b/),
    scope: 'variable.language',
    relevance: 0
  };

  // keyword
  const STORAGE_MODIFIER_LIST = [
    'abstract',
    'final',
    'global',
    'interface',
    'override',
    'private',
    'protected',
    'public',
    'static',
    'testMethod',
    'transient',
    'virtual',
    'webservice'
  ];

  const TYPES = [
    'anytype|0',
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
    'object|0',
    'pagereference|10',
    'selectoption|10',
    'short|0',
    'sobject|10',
    'string|0',
    'time|0',
    'void|0',
    'float|0'
  ];

  const DMLS = [
    'insert',
    'update',
    'upsert',
    'delete',
    'undelete',
    'merge',
    'convertLead'
  ];

  const SYSTEM_INTERFACES = [
    'schedulable',
    'batchable',
    'queueable',
    'comparable',
    'callable'
  ];

  const NAMESPACE_LIST = [
    //'ApexPages', // also a System class
    'AppLauncher',
    'Approval',
    'Auth',
    'Cache',
    'Canvas',
    'ChatterAnswers',
    'CommercePayments',
    'ConnectApi',
    'Database',
    'Datacloud',
    'Dataweave',
    'DataSource',
    'Dom',
    'EventBus',
    'ExternalService',
    'Flow',
    'Functions',
    'Invocable',
    'KbManagement',
    'LxScheduler',
    'Messaging',
    'Metadata',
    'Pref_center',
    'Process',
    'QuickAction',
    'Reports',
    'RichMessageing',
    //'Schema', // also a System class
    'Search',
    'Sfc',
    'Sfdc_Checkout',
    'sfdc_surveys',
    'Site',
    'Support',
    'System',
    'TerritoryMgmt',
    'TxnSecurity',
    'UserProvisioning',
    'VisualEditor',
    'Wave'
  ];

  // TODO: Check if these are necessary
  const SYSTEM_CLASSES = [
    'AccessLevel',
    'Address',
    'Answers',
    'ApexPages',
    'Approval',
    'Assert',
    'AsyncInfo',
    'AsyncOptions',
    'BusinessHours',
    'Cases',
    'Collator',
    'Continuation',
    'Cookie',
    'Crypto',
    'Database',
    'Date',
    'Datetime',
    'Decimal',
    'Domain',
    'DomainCreator',
    'DomainParser',
    'EmailMessages',
    'EncodingUtil',
    'EventBus',
    'Exception',
    'FeatureManagement',
    'FlexQueue',
    'Formula',
    'FormulaRecalcFieldError',
    'FormulaRecalcResult',
    'Http',
    'HttpRequest',
    'HttpResponse',
    'Ideas',
    'JSON',
    'JSONGenerator',
    'JSONParser',
    'Label',
    'Limits',
    'Location',
    'Matcher',
    'Math',
    'Messaging',
    'MultiStaticResourceCalloutMock',
    'Network',
    'OrgLimit',
    'OrgLimits',
    'Packaging',
    'PageReference',
    'Pattern',
    'QueueableDuplicateSignature',
    'QueueableDuplicateSignature.Builder',
    'QuickAction',
    'Request',
    'ResetPasswordResult',
    'RestContext',
    'RestRequest',
    'RestResponse',
    'Schema',
    'Search',
    'Security',
    'SelectOption',
    'Site',
    'SObject',
    'SObjectAccessDecision',
    'StaticResourceCalloutMock',
    'Test',
    'TimeZone',
    'Trigger',
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

  const BUILT_INS = NAMESPACE_LIST.concat(...SYSTEM_CLASSES);

  const LITERALS = ['false', 'true', 'null'];

  const SALESFORCE_ID = {
    match: /(?<!\.)\bId\b/,
    scope: 'type',
    relevance: 8
  };

  const KEYWORDS = {
    $pattern: regex.concat(/(?<!\.)/, APEX_IDENT_WORD_RE),
    keyword: MAIN_KEYWORD_LIST.concat(...STORAGE_MODIFIER_LIST).concat(...DMLS),
    'variable.language': LANGUAGE_VAR_LIST,
    //built_in: BUILT_INS,
    type: TYPES,
    literal: LITERALS
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
    {
      match: regex.either(...PUNCTUATION_LIST),
      scope: 'punctuation',
      relevance: 0
    }
  ];

  const STRINGS = hljs.inherit(hljs.APOS_STRING_MODE, {
    contains: [
      {match: /\\'/,
      scope: 'literal'}
    ],
    scope: 'string'
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
        scope: { 1: 'doctag', 3: 'title.class' }
      },
      {
        begin: '@[A-Za-z_-]+',
        scope: 'doctag'
      },
      {
        match: [/(?<=@param)\s+/, APEX_IDENT_RE],
        scope: { 2: 'variable' },
        contains: PUNCTUATION
      },
      {
        begin: '`',
        end: '`',
        excludeBegin: true,
        excludeEnd: true,
        scope: 'string',
        contains: [hljs.BACKSLASH_ESCAPE, PUNCTUATION],
        relevance: 0
      },
      STRINGS
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
        STRINGS,
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
      match: [/\b[a-zA-Z0-9\.]*Exception/, SPACE, APEX_IDENT_RE],
      scope: { 1: 'title.class', 3: 'variable' },
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
        1: 'type'
      },
      relevance: 0
    }
  ];

  const INSTANTIATE = [
    // Handling java array-style in Collection section
    {
      // Account a = new Account(Name = 'test account);
      begin: /\bnew\s/,
      beginScope: 'keyword',
      end: /(?=\(|\{|;)/,
      scope: 'instantiate',
      contains: [
        { match: [APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD_RE], scope: {1: 'type' }},
        COMMENT_LINE,
        OPERATORS,
        COLLECTION_REGEX
      ],
      illegal: ':',
      relevance: 0
    }
  ];

  const NAMESPACES = [
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
    /* {
      match: [
        /\b/,
        regex.either(...SYSTEM_CLASSES),
        /\./,
        APEX_IDENT_RE,
        regex.lookahead(/[\.\(\s]/)
      ],
      scope: { 2: 'built_in', 3: 'punctuation', 4: 'keyword system' }
    }, */
    {
      match: regex.concat(
        regex.either(...BUILT_INS),
        regex.lookahead(/\./)
      ),
      scope: 'built_in namespace'
    },
    {
      match: [
        regex.concat('(?<=\\b', regex.either(...BUILT_INS), ')'),
        /\./,
        APEX_IDENT_RE,
        regex.lookahead(/[\.\(\s]/)
      ],
      scope: {2: 'punctuation',3: 'keyword priority' }
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
      end: [/\./, APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD_RE],
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

  const PARAMS = {
    scope: 'parameters',
    begin: /\((?!\s*\[)/,
    beginScope: 'punctuation',
    end: /\)/,
    returnEnd: true,
    //endsParent: true,
    relevance: 0,
    keywords: {
      KEYWORDS
    },
    illegal: MAIN_KEYWORD_LIST,
    contains: [
      STRINGS,
      COMMENT_LINE,
      COMMENT_BLOCK,
      OPERATORS,
      COLLECTION_REGEX,
      NAMESPACES,
      NUMBERS,
      INSTANTIATE,
      SALESFORCE_ID,
      'self',
      {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: regex.concat(
          /(?<=[\s\(])/,
          APEX_IDENT_WORD_RE,
          regex.lookahead(regex.concat(SPACE, APEX_IDENT_RE, /\s*[,)]/))
        ),
        scope: 'type'
      },
      { match: /(?:,|\.)/, scope: 'punctuation' }
    ]
  };

  const MISCELLANEOUS = [
    {
      // mynum =
      // could also be a collection variable
      match: [/(?<!\.)\b/, APEX_IDENT_RE, /\s*(?=\=[^\>])/],
      scope: { 2: 'variable' }
    },
    // Casting
    {
      match: [
        /(?<=\=\s*\()/,
        APEX_IDENT_RE,
        '(?=\\)\\s*' + APEX_IDENT_RE + ')'
      ],
      scope: {
        2: 'type'
      }
    }
  ];
  // * Can use later; omitted for now
  const CUSTOM_METADATA = {
    // Custom fields, types, etc.
    match: [
      /(?<=[^\w\.])/,
      regex.concat(
        /\b/,
        APEX_IDENT_RE,
        /__(c|pc|r|b|e|mdt|x|share|kav|ka|history|del|s)/,
        /\b/
      ),
      /(?=[\(\s;,])/
    ],
    scope: {
      2: 'type'
    },
    relevance: 10
  };

  const METHOD_CALL = [
    {
      match: regex.concat(/\b/, regex.either(...BUILT_INS), /(?=\.)/),
      scope: 'built_in'
    },
    {
      match: regex.concat(/(?<=\.)\b/, APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD_RE),
      scope: 'title.function.invoke',
      starts: { contains: [PARAMS] },
      relevance: 0
    }
  ];

  const EXTEND_IMPLEMENT = {
    returnEnd: true,
    endsWithParent: true,
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
      STRINGS,
      COMMENT_LINE,
      COMMENT_BLOCK,
      COLLECTION_REGEX,
      NAMESPACES,
      { match: /\,/, scope: 'punctuation' },
      SALESFORCE_ID,
      {
        // mymethod(Date myDate, Date yourDate); highlights second part of each parameter
        // must be followed by comma or paren
        match: [SPACE, APEX_IDENT_RE, /\s*(?=[,)])/],

        scope: { 2: 'variable' }
      }
    ]
  };

  const METHOD_DECLARATION = {
    // method declaration
    match: [/(?!new)(?<=(\<|\>|\w|_))\s+/, APEX_IDENT_RE, PARENS_LOOKAHEAD_RE],
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
      match: [/(public|private|protected)\s+/, APEX_IDENT_RE, PARENS_LOOKAHEAD_RE],
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
    // * orange italic
    'ABOVE_OR_BELOW',
    'ACTIVE',
    'ADVANCED',
    'ALL',
    'ANY',
    'ARRAY',
    'AS',
    'ASC',
    'BY',
    'CATEGORY',
    'CONTAINS',
    'CUSTOM',
    'DATA',
    'DESC',
    'DIVISION',
    'END',
    'FIELDS',
    'FIND',
    'FROM',
    'LAST',
    'METADATA',
    'NETWORK',
    'ON',
    'ORDER',
    'RETURNING',
    'ROLLUP',
    'ROWS',
    'SEARCH',
    'SELECT',
    'SNIPPET',
    'SORT',
    'SPELL_CORRECTION',
    'STANDARD',
    'USER_MODE',
    'WHERE',
    'PricebookId',
    'WITH',
    'SECURITY_ENFORCED',
    'USING',
    'SCOPE',
    'Delegated',
    'Everything',
    'Mine',
    'My_Territory',
    'My_Team_Territory',
    'Team',
    'TYPEOF',
    'ELSE',
    'END',
    'THEN',
    'WHEN'
    /* /USING\s+SCOPE\s*(Delegated|Everything|Mine|My_Territory|My_Team_Territory|Team)/, */
  ];

  const SOQL_OPERATORS = [
    // * orange italic
    'ABOVE',
    'AND',
    'AT',
    'BY',
    'CATEGORY',
    'DATA',
    'FIRST',
    'FOR',
    'GROUP',
    'HAVING',
    'IN',
    'LAST',
    'LIKE',
    'LIMIT',
    'LISTVIEW',
    'NOT',
    'NULLS',
    'OFFSET',
    'OR',
    'REFERENCE',
    'TRACKING',
    'TYPEOF',
    'UPDATE',
    'UPDATE',
    'VIEW',
    'VIEWSTAT'
  ];

  const SOQL_FUNCTIONS = [
    // * blue italic
    'AVG',
    'convertCurrency',
    'convertTimezone',
    'COUNT_DISTINCT',
    'COUNT',
    'DISTANCE',
    'EXCLUDES',
    'FORMAT',
    'GEOLOCATION',
    'GROUP BY CUBE',
    'GROUP BY ROLLUP',
    'GROUPING',
    'INCLUDES',
    'MAX',
    'MIN',
    'SUM',
    'toLabel'
  ];

  const SOQL_DATE_FUNCTIONS = [
    'DAY_IN_MONTH',
    'HOUR_IN_DAY',
    'DAY_IN_WEEK',
    'DAY_IN_YEAR',
    'DAY_ONLY',
    'CALENDAR_MONTH',
    'CALENDAR_QUARTER',
    'CALENDAR_YEAR',
    'FISCAL_MONTH',
    'FISCAL_QUARTER',
    'FISCAL_YEAR',
    'TODAY',
    'TOMORROW',
    'YESTERDAY',
    'WEEK_IN_MONTH',
    'WEEK_IN_YEAR'
  ];

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
        .concat(...SOQL_KEYWORDS)
        .concat(...SOQL_OPERATORS), // * orange italic
      type: SOQL_FUNCTIONS, // * blue italic
      'title.function': SOQL_DATE_FUNCTIONS, // * blue normal
      literal: KEYWORDS.literal,
      built_in: BUILT_INS
    },
    contains: [
      {
        begin: /\bSELECT\b/,
        beginScope: 'keyword',
        //beginKeyword: 'SELECT',
        end: /\bFROM\b/,
        returnEnd: true,
        scope: 'select clause',
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
        scope: 'from_clause',
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
    begin: [
      /\bfor\b\s*/,
      /\(/,
      APEX_IDENT_RE,
      SPACE,
      APEX_IDENT_RE,
      /\s*/,
      /:/
    ],
    beginScope: {
      3: 'type',
      5: 'variable',
      7: 'operator'
    },
    end: /(?=\{)/,
    scope: 'for_loop',

    contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      SOQL_QUERY,
      METHOD_CALL,
      {
        match: regex.concat(APEX_IDENT_RE, /\b(?!\()/),
        scope: 'variable'
      },
      {
        match: regex.concat(APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD_RE),
        scope: 'title.function.invoke'
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
     * naked - insert a;
     *
     */
    {
      match: [
        regex.concat(/\b/, regex.either(...DMLS)),
        /\s+/,
        APEX_IDENT_WORD_RE,
        /(?=;)/
      ],
      scope: { 1: 'keyword', 3: 'variable' }
    },
    /*
     * DML types
     * naked - delete as system [SELECT Id FROM Account];
     *
     */
    {
      begin: regex.concat(/\b/, regex.either(...DMLS), /\s+(?!\()/),
      beginScope: 'keyword',
      end: /;|$/,
      returnEnd: true,
      //scope: 'dml',
      contains: [
        INSTANTIATE,
        {
          match: /\bas\s+(user|system)\b/,
          scope: 'keyword'
        },
        COMMENT_LINE,
        SOQL_QUERY,
        NUMBERS,
        OPERATORS
      ]
    },
    /*
     * DML types
     * Database - Database.insert( );
     *
     */
    {
      begin: [/\bDatabase\b/, /\./, regex.either(...DMLS), PARENS_LOOKAHEAD_RE],
      beginScope: {
        1: 'built_in',
        2: 'punctuation',
        3: 'title.function.invoke'
      },
      end: /\)/,
      endScope: 'punctuation',
      //scope: 'database_dml',
      contains: [PARAMS, STRINGS, COMMENT_BLOCK, COMMENT_LINE]
    }
  ];

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
    /(SELECT|RETURNING)\s+\*/,
    /END\s+LOOP/,
    /CREATE\s+FUNCTION/,
    /\bint\b/,
    /import\s+\w+\s+=\s+require\("\w+"\)/,
    '/^include\b/',
    /\buse\s+strict\b/,
    /\w+\s+=\s+"\S*";/,
    /\/include\//,
    /\Anamespace\b/,
    /\bend(\.)?\n/,
    '"""',
    /\+\+\+/,
    /<%/,
    '<%#',
    '%%>',
    '<%%',
    ':-',
    /\bmergesort\(/,
    /\bvar\s+env\b/,
    /\bdef\b\s\W:/,
    /"[^"]+"/ // Quote_string_mode
    // /@\w+\[\w+\]/ //moonscript
  ];

  return {
    name: 'Apex',
    aliases: ['apex', 'lightning', 'soql'],
    case_insensitive: true, // language is case-insensitive
    disableAutodetect: false,
    ignoreIllegals: false,
    keywords: KEYWORDS,
    illegal: ILLEGALS,
    contains: [
      ANNOTATIONS,
      MISCELLANEOUS,
      COLLECTION_REGEX,
      COMMENT_BLOCK,
      COMMENT_LINE,
      CUSTOM_METADATA,
      DECLARATIONS,
      DML_OPERATIONS,
      EXCEPTION,
      FOR_LOOP,
      STRINGS,
      INSTANTIATE,
      LANGUAGE_VARS_RE,
      METHOD_CALL,
      NAMESPACES,
      NUMBERS,
      OPERATORS,
      PUNCTUATION,
      SALESFORCE_ID,
      SOQL_QUERY,
      SWITCH_STATEMENT
    ]
  };
}
