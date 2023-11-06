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
  const SPACEPARENS_LOOKAHEAD = /(?=\s*\()/;
  const PARENS_LOOKAHEAD = /(?=\()/;
  const SPACE = /\s+/;

  const ACCESSOR = /(?<!\?)\./;
  const NULLSAFE = /\?\.\b/;
  const DOT_NOTATION = [
    { match: ACCESSOR, scope: 'punctuation', relevance: 0 },
    { match: NULLSAFE, scope: 'operator', relevance: 0 }
  ];

  /**
   * @param {...(RegExp | string) } args
   * @returns {string}
   */
  function noneOf(...list) {
    return regex.concat('(?!', list.join('|'), ')');
  }

  /* LISTS */

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
  const KEYWORD_LIST = [
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
    'pagereference|8',
    'selectoption|8',
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
    'Schema', // also a System class
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
    //'Schema',
    'Search',
    'Security',
    'SelectOption',
    'Site',
    'SObject',
    'SObjectAccessDecision',
    'StaticResourceCalloutMock',
    'Test',
    'TimeZone',
    //'Trigger', // handled separately
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

  const LITERALS = ['false', 'true', 'null'];

  const PUNCTUATION_LIST = [
    ',',
    /;/,
    /(?<=\w)\>/,
    /\<(?=\w)/,
    /\{|\}/,
    /\(|\)/,
    /\{|\}/
  ];

  const PUNCTUATION_COMMA = {
    match: /,/,
    scope: 'punctuation',
    relevance: 0
  };

  const OPERATORS_LIST = [
    /--/, // decrement
    /\+\+/, // increment
    /\&\&|\|\|/, // logical
    /\*\=|\/\=|\%\=|\+\=|-\=/, // assignment.compound
    /\&\=|\^\=|<<\=|>>\=|>>>\=|\|\=/, // assignment.compound.bitwise
    /\&|~|\^|\|/, // bitwise
    /<<|>>/, // bitwise.shift
    /<\=|>\=|\s(<|>)\s/, // relational
    /\=\=|!\=/, // comparison
    /\=>/, // map assign
    /!(?=\w)/, // negator
    /(?<=\s)(\?|:)(?=\s)/, // standalone ? or : (ternary operator?)
    NULLSAFE, // null-safe operator
    /(?<!\?)\?(?!\?|\.|\[)/, // ternary operator or CONDITIONAL_OPERATOR
    /%[^%]|\*[^\/]|\/[^\/\*]|(?<!\-)\-(?!\-)|(?<!\+)\+(?!\+)/, // arithmetic
    /(?<!\=|!)\=(?!\=|>)/ // assignment
  ];

  const BUILT_INS = NAMESPACE_LIST.concat(...SYSTEM_CLASSES);

  const KEYWORDS = {
    $pattern: regex.concat(/(?<!\.)\b/, APEX_IDENT_RE, /\b/),
    keyword: [...KEYWORD_LIST, ...STORAGE_MODIFIER_LIST, ...DMLS],
    'variable.language': LANGUAGE_VAR_LIST,
    built_in: BUILT_INS,
    type: TYPES,
    literal: LITERALS
  };

  const LANGUAGE_VARS_RE = {
    match: regex.concat(/\b/, regex.either(...LANGUAGE_VAR_LIST), /\b/),
    scope: 'variable.language',
    relevance: 0
  };

  const NAMESPACES = [
    {
      match: [
        /\b/,
        regex.either(...NAMESPACE_LIST),
        /\./,
        APEX_IDENT_RE,
        /(?=\.)/
      ],
      scope: { 2: 'built_in', 4: 'type' }
    },
    {
      match: [
        /\b/,
        regex.either(...NAMESPACE_LIST),
        /\./,
        APEX_IDENT_RE,
        /\b(?!\.|\()/
      ],
      scope: { 2: 'built_in', 3: 'punctuation', 4: 'keyword' }
    },
    {
      match: [
        /\b/,
        regex.either(...NAMESPACE_LIST),
        /\./,
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ],
      scope: { 2: 'built_in', 3: 'punctuation', 4: 'keyword' }
    },
    {
      match: [
        regex.concat(/\b/, regex.either(...SYSTEM_ENUMS)),
        /\??\./,
        APEX_IDENT_RE,
        /\s*(?![\.\(])/
      ],
      // TODO: Find a better scope for the enum value
      scope: { 1: 'built_in', 2: 'punctuation', 3: 'variable' },
      relevance: 0
    },
    {
      // Trigger variables
      match: [
        /\bTrigger\b/,
        /\./,
        /(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size|operationType)\b(?!\.)/
      ],
      scope: { 1: 'built_in', 2: 'punctuation', 3: 'type' },
      relevance: 10
    },
    {
      // Trigger operationtype
      match: [
        /\btrigger\b/,
        /\./,
        'operationtype',
        /\./,
        regex.concat(APEX_IDENT_WORD_RE, /\b/)
      ],
      scope: {
        1: 'built_in',
        2: 'punctuation',
        3: 'keyword',
        4: 'punctuation',
        5: 'variable.constant'
      },
      relevance: 10
    }
  ];
  // use this to include comma
  // use comma only for situations where parens will break things
  const PUNCTUATION = [
    {
      match: regex.either(...PUNCTUATION_LIST),
      scope: 'punctuation',
      relevance: 0
    },
    PUNCTUATION_COMMA
  ];

  const STRINGS = hljs.inherit(hljs.APOS_STRING_MODE, {
    scope: 'string',
    relevance: 0,
    contains: [{ match: /\\'/, scope: 'literal', relevance: 0 }]
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
        scope: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      }
    ]
  });

  const COMMENTS = [COMMENT_BLOCK, COMMENT_LINE];

  const OPERATORS = {
    match: regex.either(...OPERATORS_LIST),
    scope: 'operator',
    relevance: 0
  };

  const SALESFORCE_ID = {
    match: /(?<!\.)\bId\b/,
    scope: 'type',
    relevance: 8
  };

  const COLLECTIONS = [
    {
      //scope: 'clause: collection',
      begin: /\b(list|set|map)(?=\s*<)/,
      beginScope: 'type',
      end: /\>+/,
      endScope: 'punctuation',
      contains: [
        { match: /\<|\,/, scope: 'punctuation' },
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

  const ANNOTATIONS = [
    {
      //Type 1: one annotation
      // @isTest
      match: regex.concat(ANNOTATION_RE, /\b(?!\s*\()/),
      scope: 'meta'
    },
    {
      // Type 2: annotation and parentheses
      // @SuppressWarnings('PMD.AvoidGlobalModifier'))
      // Type 3: annotation on one line and parentheses on next
      // @IsTest
      // (Seealldata=true)
      scope: 'meta',
      begin: [regex.concat(ANNOTATION_RE, /\b/), /\s*/, /\(/],
      beginScope: { 3: 'punctuation' },
      end: /\)/,
      endScope: 'punctuation',
      //scope: 'clause: annotation',
      contains: [
        {
          match: [APEX_IDENT_WORD_RE, /\s*=/],
          scope: {
            1: 'keyword',
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

  const EXCEPTION = {
    // Various Apex Exception types
    match: [/\b[a-zA-Z0-9\.]*Exception/, SPACE, APEX_IDENT_RE],
    scope: { 1: 'title.class', 3: 'variable' },
    relevance: 0
  };
  const VAR_ASSIGN = {
    // mynum =
    // could also be a collection variable
    match: [/(?<!\.)/, APEX_IDENT_WORD_RE, /\s*(?=\=[^\>])/],
    scope: { 2: 'variable' },
    relevance: 0
  };
  const CASTING = {
    // Casting
    match: [/(?<=\=\s*\()/, APEX_IDENT_RE, '(?=\\)\\s*' + APEX_IDENT_RE + ')'],
    scope: { 2: 'type' },
    relevance: 0
  };
  const INSTANTIATE_TYPE = {
    // Account a = new Account(Name = 'test account);
    match: [/\bnew\s+/, APEX_IDENT_RE, SPACEPARENS_LOOKAHEAD],
    scope: { 2: 'type' },
    relevance: 0
  };

  const PARAMS_CALL = {
    //scope: 'clause: params call',
    begin: /\((?!(\s*\[))/,
    beginScope: 'punctuation',
    end: /\)/,
    endScope: 'punctuation',
    relevance: 0,
    keywords: KEYWORDS,
    contains: [
      STRINGS,
      INSTANTIATE_TYPE,
      COMMENTS,
      OPERATORS,
      COLLECTIONS,
      NAMESPACES,
      NUMBERS,
      SALESFORCE_ID,
      {
        keywords: { KEYWORDS },
        // mymethod(var1, var2); comma-separated list
        // must be followed by comma or paren
        match: regex.concat(
          /(?<=\s|\(|\,)/,
          noneOf(...LITERALS),
          APEX_IDENT_RE,
          /\b/,
          /(?!\.)/
        ),
        scope: 'variable',
        relevance: 0
      },
      { match: /\,|\./, scope: 'punctuation', relevance: 0 }
    ]
  };

  const FUNCTION_CALL = [
    {
      //scope: 'clause: function_call',
      match: [
        regex.concat(/\b/, noneOf(...BUILT_INS)),
        /\??(?<=\.)/,
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ],
      scope: { 3: 'title.function.invoke' },
      relevance: 0
    },
    {
      match: [
        /^\s*/,
        noneOf(...KEYWORD_LIST),
        APEX_IDENT_RE,
        SPACEPARENS_LOOKAHEAD
      ],
      scope: { 3: 'title.function.invoke' },
      relevance: 0
    }
  ];

  const PARAMS_DECLARATION = {
    scope: 'params', // NOTE: declaration
    end: /\)/,
    endScope: 'punctuation',
    relevance: 0,
    keywords: KEYWORDS,
    illegal: KEYWORD_LIST,
    contains: [
      NUMBERS,
      STRINGS,
      COMMENTS,
      COLLECTIONS,
      ...NAMESPACES,
      { match: /\,|\(/, scope: 'punctuation' },
      SALESFORCE_ID,
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

  const EXTEND_IMPLEMENT = {
    returnEnd: true,
    endsWithParent: true,
    beginKeywords: 'implements extends',
    end: /\{/,
    contains: [
      NAMESPACES,
      {
        match: [APEX_IDENT_WORD_RE, /(?=\.)/],
        scope: { 1: 'built_in' }
      },
      {
        match: regex.concat(APEX_IDENT_WORD_RE, /(?=>)/),
        scope: 'type'
      },
      {
        match: regex.concat(
          /\b/,
          regex.either(...SYSTEM_INTERFACES),
          /\b\s*(?!>)/
        ),
        scope: 'title.class.inherited',
        relevance: 8
      },
      {
        match: regex.concat(APEX_IDENT_WORD_RE, /(?!<)/),
        scope: 'title.class.inherited'
      },
      { match: /<|>|,/, scope: 'punctuation' }
    ],
    relevance: 0
  };

  const TRIGGER_DECLARATION = {
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
    //scope: 'clause: trigger_declaration',
    contains: [
      COMMENTS,
      {
        begin: /\(/,
        end: /\)/,
        contains: [
          {
            match: /\b(before|after)\s+(insert|update|delete|merge|undelete)\b/,
            scope: 'keyword',
            relevance: 5
          },
          PUNCTUATION_COMMA
        ]
      }
    ]
  };
  const CLASS_SHARING = {
    // class sharing
    relevance: 5,
    match: /\b(with|without|inherited)\s+sharing\b/,
    scope: 'keyword'
  };
  const CLASS_DECLARATION = {
    // class declaration
    begin: [/(?!\.)/, /\bclass\b(?!\?|\.)/],
    beginScope: { 2: 'keyword' },
    end: /(?=\{)/,
    relevance: 1,
    //scope: 'clause: class_declaration',
    keywords: { type: TYPES, keyword: KEYWORD_LIST },
    contains: [
      {
        match: [/(?<=\bclass)\s+/, APEX_IDENT_RE],
        scope: { 2: 'title.class' }
      },
      EXTEND_IMPLEMENT
    ]
  };
  const ENUM_DECLARATION = {
    // enum declaration
    begin: [/\benum\s+/, APEX_IDENT_RE, /\s*\{/],
    beginScope: { 2: 'type', 3: 'punctuation' },
    end: /\}/,
    endScope: 'punctuation',
    //scope: 'enum_declaration',
    relevance: 0,
    contains: [
      COMMENTS,
      PUNCTUATION_COMMA,
      {
        match: regex.concat(APEX_IDENT_WORD_RE),
        scope: 'variable.constant'
      }
    ]
  };

  const DECLARATIONS = [
    TRIGGER_DECLARATION,
    CLASS_SHARING,
    CLASS_DECLARATION,
    ENUM_DECLARATION,
    {
      // * Constructor
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
    }
  ];

  const SWITCH_STATEMENT = {
    match: [/\bswitch\s+on\s+/, APEX_IDENT_RE],
    scope: { 1: 'keyword', 2: 'variable' }
  };

  const DML_OPERATIONS = [
    {
      match: /as\s+(user|system)\b/,
      scope: 'keyword'
    }
    /* {
      match: [
        regex.concat(/\b/, regex.either(...DMLS)),
        /\s+(?!\()/,
        regex.optional(/as\s+(user|system)\b/)
      ],
      scope: { 3: 'keyword' }
    } */
  ];

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

  const SOQL_SPECIAL_WORDS = {
    keyword: []
      .concat(...KEYWORDS.keyword)
      .concat(...SOQL_KEYWORDS)
      .concat(...SOQL_OPERATORS), // * orange italic
    type: SOQL_FUNCTIONS, // * blue italic
    'title.function': SOQL_DATE_FUNCTIONS, // * blue normal
    literal: KEYWORDS.literal,
    built_in: BUILT_INS
  };

  const SOQL_SELECT = {
    begin: /\bSELECT\b/,
    beginScope: 'keyword',
    end: /\bFROM\b/,
    returnEnd: true,
    //scope: 'clause: select',
    keywords: SOQL_SPECIAL_WORDS,
    contains: [
      PUNCTUATION_COMMA,
      {
        match: [/(?=[\s\,])/, APEX_IDENT_RE, /(?=[\s\,])/],
        scope: { 2: 'subst' }
      } // * back to main text color
    ]
  };
  const SOQL_DATE_LITERALS = {
    match:
      /(NEXT|LAST|THIS)_(90_DAY|DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S?\b/,
    scope: 'keyword',
    relevance: 8
  };
  const SOQL_DATE_LITERALS_W_PARAMS = {
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
    relevance: 8
  };

  const SOQL_QUERY = {
    begin: [/\[/, /\s*(?=(SELECT|FIND)\b)/],
    end: /\]/,
    beginScope: { 1: 'punctuation' },
    endScope: 'punctuation',
    scope: 'soql',
    relevance: 10,
    endsWithParent: true,
    keywords: SOQL_SPECIAL_WORDS,
    contains: [
      SOQL_SELECT,
      NUMBERS,
      OPERATORS,
      STRINGS,
      PUNCTUATION_COMMA,
      { match: /\(|\)/, scope: 'punctuation', relevance: 0 },
      ...DOT_NOTATION,
      {
        begin: [/\bFROM\b/, SPACE],
        beginScope: { 1: 'keyword' },
        //scope: 'clause: from_clause',
        end: /(?=\bWHERE\b|\]|\s|\))/,
        //returnEnd: true,
        contains: [{ match: APEX_IDENT_RE, scope: 'type' }, ...DOT_NOTATION]
      },
      SOQL_DATE_LITERALS,
      SOQL_DATE_LITERALS_W_PARAMS,
      {
        match: [/(?<=:)/, /\s*/, APEX_IDENT_WORD_RE, /(?!\()/],
        scope: { 3: 'variable' },
        relevance: 0
      },
      {
        match: [/(?<=:|\.)/, APEX_IDENT_RE, /(?=\s*\()/],
        scope: { 2: 'title.function.invoke' },
        relevance: 0
      },
      //PARAMS_CALL,
      { match: /:/, scope: 'operator', relevance: 0 }
    ],
    illegal: '::'
  };

  const FOR_LOOP = {
    match: [
      /\bfor\b\s*/,
      /\(/,
      APEX_IDENT_RE,
      SPACE,
      APEX_IDENT_RE,
      /\s*/,
      /:/
    ],
    scope: {
      3: 'type',
      5: 'variable',
      7: 'operator'
    }
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
    /\b_/, // underscore at start of a word
    '::=',
    /\s#[a-zA-Z]/,
    /\s_[a-zA-Z]/,
    /\s\$[a-zA-Z]/,
    '#if',
    '%if',
    /\bif(?!\s+\()/, //coffeescript
    '%endif',
    '#endif',
    '#_', // clojure
    /\d\s+\d/, //clojure
    /\w::\w/,
    /\bfloat\b/, // many languages
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
    /"[^"]+"/, // Quote_string_mode
    // /@\w+\[\w+\]/ //moonscript
    /\(\*|\*\)/ //mathematica, ocaml
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
      CASTING,
      COLLECTIONS,
      COMMENTS,
      DECLARATIONS,
      DML_OPERATIONS,
      DOT_NOTATION,
      EXCEPTION,
      FOR_LOOP,
      FUNCTION_CALL,
      INSTANTIATE_TYPE,
      LANGUAGE_VARS_RE,
      NAMESPACES,
      NUMBERS,
      OPERATORS, // includes null-safe
      PARAMS_CALL,
      PUNCTUATION, // includes comma
      SALESFORCE_ID,
      SOQL_QUERY,
      STRINGS,
      SWITCH_STATEMENT,
      VAR_ASSIGN
    ]
  };

  /*   // * Can use later; omitted for now
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
  }; */
}
