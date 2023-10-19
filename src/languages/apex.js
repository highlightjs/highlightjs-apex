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
  //const APEX_ALPHA_UNDER = '[a-zA-Z][a-zA-Z_]*';
  //const APEX_FULL_TYPE_RE = '[a-zA-Z][a-zA-Z_0-9.<>]*';

  const NUMBER = {
    scope: 'number',
    variants: [
      {
        match: /(-?)\b[0-9]+(?:\.[0-9]+)?/
      },
      {
        // numeric decimal
        // decimal-digits . decimal-digits exponent-part[opt] real-type-suffix[opt] OR . decimal-digits exponent-part[opt] real-type-suffix[opt]
        match: /(-?)\b([0-9_]+)?\.[0-9_]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\b/
      },
      {
        // numeric decimal
        // decimal-digits exponent-part real-type-suffix[opt]
        match: /(-?)\b[0-9_]+(e|E)[0-9_]+(F|f|D|d|M|m)?\b/
      },
      {
        // numeric decimal
        // decimal-digits real-type-suffix
        match: /(-?)\b[0-9_]+(F|f|D|d|M|m)\b/
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

  const COMPOUND_KEYWORDS = {
    match: /\b(switch\s+on|as\s+user|as\s+system)\b/,
    relevance: 8,
    scope: 'keyword'
  };

  const NAMESPACE_LIST = [
    'ApexPages|10',
    'AppLauncher',
    'Approval',
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
    'UserProvisioning|10',
    'VisualEditor|10',
    'Wave|10'
  ];

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
    'TimeZone',
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
    'DomainType',
    'JSONToken',
    'LoggingLevel',
    'Quiddity',
    'TriggerOperation'
  ];

  const SYSTEM_INTERFACES = [
    'Callable',
    'Comparable',
    'Comparator',
    'HttpCalloutMock',
    'InstallHandler',
    'Queueable',
    'QueueableContext',
    'SandboxPostCopy',
    'Schedulable',
    'SchedulableContext',
    'StubProvider',
    'UninstallHandler',
    'WebServiceMock'
  ];

  const SYSTEM_INVOKE = [
    {
      match: [/\b/, regex.either(...SYSTEM_CLASSES), /\./],
      scope: { 2: 'title' },
      relevance: 9
    }
  ];

  const NAMESPACES = [
    {
      match: [/\b/, regex.either(...SYSTEM_INTERFACES), /\b/],
      scope: { 2: 'title.class.inherited' },
      relevance: 10
    },
    {
      match: [/\b/, regex.either(...NAMESPACE_LIST), /\./, APEX_IDENT_RE, /\b/],
      scope: { 2: 'built_in', 4: 'title.class' }
    },
    {
      match: [/\b/, regex.either(...NAMESPACE_LIST), /(?=\.)/],
      scope: { 2: 'built_in' },
      relevance: 10
    },
    {
      match: [/\bSystem/, '.', APEX_IDENT_RE, /(?=\.)/],
      scope: { 1: 'built_in', 3: 'title.class' },
      relevance: 10
    },
    {
      match: [/\b/, regex.either(...SYSTEM_ENUMS), /\./, APEX_IDENT_RE, /\b/],
      // TODO: Find a better scope for the enum value
      scope: { 2: 'built_in', 4: 'type' }
    }
  ];

  const OPERATOR_REGEX = [
    /-/,
    /--/,
    /~/,
    /\*/,
    /\*=/,
    /\/=/,
    /%[^%]/,
    /\+/,
    /\+\+/,
    /<</,
    />>/,
    />=/,
    /<=/,
    /\s<\s/,
    /\s>\s/,
    /\^/,
    /\^=/,
    /!=/,
    /!/,
    /==/,
    /&&/,
    /&/,
    /\|\|/,
    /\|/,
    /(?<=\s)\?|:(?=\s)/,
    /=/,
    /=>/,
    /\?\./
  ];

  const OPERATORS = {
    match: regex.either(...OPERATOR_REGEX),
    scope: 'operator',
    relevance: 0
  };

  const PUNCTUATION_REGEX = ['{', '}', ',', /\./];

  const PUNCTUATION = {
    match: regex.either(...PUNCTUATION_REGEX),
    scope: 'punctuation',
    relevance: 0
  };

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
      hljs.APOS_STRING_MODE,
      {
        match: [/(?<=@param)/, /\s+/, /\w+/],
        scope: {
          3: 'variable'
        }
      }
    ]
  });

  // Extraneous for now - will be useful if we go this route BUT will need more maintenance
  /* const ANNOTATION_MODIFIER_TYPES = [
    'required',
    'label',
    'description',
    'seealldata|10',
    'isparallel|10',
    'callout',
    'urlMapping',
    'serializable',
    'deserializable',
    'category',
    'configurationEditor',
    'IconName',
    'cacheable',
    'scope'
  ]; */

  const ANNOTATION_KEYS = [
    'label',
    'description',
    'callout',
    'required',
    'category',
    'configurationEditor',
    'iconName',
    'SeeAllData'
  ];

  const ANNOTATION_ATTRIBUTE_PARAMS = {
    match: [/(?<!\.)/, regex.either(...ANNOTATION_KEYS), /\s*/, /=/],
    //end: /(?:,|\))/,
    scope: {
      2: 'meta keyword',
      4: 'operator'
    }
  };

  const ANNOTATIONS = [
    // We will allow any annotation, so we do not need to maintain this as often
    //match: [regex.either(...APEX_ANNOTATIONS), /(?=(\(|\b|\s))/],
    {
      begin: [regex.concat('@', APEX_IDENT_RE), /\s*\(/],
      beginScope: {
        1: 'meta'
      },
      //        end: /\)/,
      contains: [
        {
          match: [APEX_IDENT_RE, '='],
          scope: { 1: 'meta keyword', 2: 'operator' }
        },
        'self',
        ANNOTATION_ATTRIBUTE_PARAMS
      ]
    },
    {
      match: [regex.concat('@', APEX_IDENT_RE, /\b/), /\s+(?!\()/], //, /(?=(\(|\b|\s))/]
      scope: { 1: 'meta' }
    }
  ];

  const EXCEPTION = [
    {
      // Various Apex Exception types
      match: /\b[a-zA-Z\d]*Exception\b/,
      scope: 'title.class',
      relevance: 0
    },
    {
      match: [/\wthrow\s+new\s+/, APEX_IDENT_RE],
      scope: {
        1: 'keyword',
        2: 'title.class'
      },
      relevance: 0
    }
  ];

  const COLLECTION_VALUE = [
    {
      match: [regex.concat(/\b/, APEX_IDENT_RE, /\b/), '>'],
      scope: {
        1: 'type'
      },
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
      match: [APEX_IDENT_RE, regex.lookahead(/\s*\[\]/)],
      scope: {
        1: 'type'
      }
    }
  ];

  const CUSTOM_METADATA = {
    // Custom fields, types, etc.
    match: [
      /(\w|[^\.])/,
      regex.concat(
        /\b/,
        APEX_IDENT_RE,
        /__(c|pc|r|b|e|mdt|x|share|kav|ka|history|del|s)/,
        //regex.either(...OBJECT_SUFFIXES),
        /\b/
      ),
      /(?=[\(\s;,])/
    ],
    scope: {
      2: 'type'
    },
    relevance: 10
  };

  const PARAM_VARS = {
    contains: [NUMBER, hljs.APOS_STRING_MODE],
    illegal: ':',
    relevance: 0,
    variants: [
      {
        match: regex.concat(/\b/, regex.either(...LITERALS), /\b/),
        scope: 'literal'
      },
      {
        // mymethod(c.Id, c.Name); highlights each part of each parameter
        // must be followed by comma or paren
        match: [APEX_IDENT_RE, /\./, APEX_IDENT_RE, /\s*(?=[,)])/],
        scope: { 1: 'variable', 3: 'property' }
      },
      {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s*(?=[,)])/],
        scope: { 1: 'type', 3: 'variable' }
      },
      {
        // Parameter type, when declaring a method.
        // This is a word, with/without a period, followed by a space and then NOT by a comma or paren
        match: [
          regex.either(
            APEX_IDENT_RE,
            regex.concat(APEX_IDENT_RE, /\./, APEX_IDENT_RE)
          ),
          /\s+(?![,)])/
        ],
        scope: { 1: 'variable' }
      },
      {
        // Second part of the parameter, followed by comma or paren
        match: [APEX_IDENT_RE, /\s*(?=[,)])/],
        scope: { 1: 'variable' }
      }
    ]
  };

  const INSTANTIATE = [
    {
      // Account a = new Account(Name = 'test account);
      begin: [/\bnew\b/, /\s+/, APEX_IDENT_RE, /\s*/, /\(/],
      beginScope: {
        1: 'keyword',
        3: 'title.function.invoke'
      },
      end: /(?=\))/,
      returnEnd: true,
      scope: 'params',
      contains: [PARAM_VARS, { match: /\(\)/ }, COMMENT_LINE],
      illegal: ':'
    }
  ];

  const METHOD_CALL = {
    variants: [
      {
        begin: [/\./, regex.concat('(?:' + APEX_IDENT_RE + ')'), /(?=\s*\(\))/],
        beginScope: { 2: 'title.function.invoke' }
      },
      /*  {
        begin: [
          /\./,
          regex.concat('(?:' + APEX_IDENT_RE + ')'),
          /(?=\s*\([^\)])/
        ],
        beginScope: { 2: 'title.function.invoke' }
      }, */
      {
        begin: [
          /(?<=\s)/,
          regex.concat('(?:' + APEX_IDENT_RE + ')'),
          /(?=\s*\()/
        ],
        beginScope: { 2: 'title.function' }
      }
    ],
    end: /(?=\))/,
    returnEnd: true,
    contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      hljs.APOS_STRING_MODE,
      PARAM_VARS,
      INSTANTIATE
    ],
    relevance: 0
  };

  const CLASS_SHARING = {
    relevance: 10,
    match: /\b(with|without|inherited)\s+sharing\b/,
    scope: 'keyword'
  };

  const APEX_DECLARATIONS = [
    {
      // Enum
      begin: [/\b(?<=enum)\s+/, APEX_IDENT_RE, /\s*/, /[{()]/],
      beginScope: {
        2: 'type',
        4: 'punctuation'
      },
      end: /[})]/,
      endScope: 'punctuation',
      relevance: 0,
      contains: [
        COMMENT_LINE,
        COMMENT_BLOCK,
        {
          match: regex.concat(/\b/, APEX_IDENT_RE, /\b/),
          scope: 'variable.constant'
        }
      ] // , CUSTOM_OBJECT
    },
    // Class Name
    {
      match: [/(?<=\bclass\b)/, /\s+/, APEX_IDENT_RE],
      scope: {
        1: 'keyword',
        3: 'title.class'
      }
    },
    // Constructor
    // Matches public/private, methodname, then parens and a curly bracket
    {
      begin: [/(?<=(public|private))/, /\s+/, APEX_IDENT_RE, /(?=\s*\()/], // /(?=\s*\()/],
      beginScope: {
        3: 'constructor'
      },
      end: /\)\s*{/,
      contains: [PARAM_VARS]
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
        1: 'keyword',
        3: 'title.class',
        5: 'operator',
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
        COLLECTION_VALUE
      ],
      relevance: 0,
      illegal: [/\b_/, /_\b/]
    }, */
    // extending

    // TODO: Change to beginKeywords and assign scope 'keyword'
    {
      begin: /(?<=extends|implements)\s*/,
      end: '{',
      contains: [
        NAMESPACES,
        {
          match: [/\b/, APEX_IDENT_RE, /\b/],
          scope: { 2: 'title.class.inherited' }
        },
        {
          match: [/\b/, APEX_IDENT_RE, /\./, APEX_IDENT_RE, /\b/],
          scope: { 2: 'title.class.inherited', 4: 'title.class.inherited' }
        }
      ]
    }
  ];

  const DML_SECURITY = {
    // TODO: Pick better scopes here
    match: ['AccessLevel', '.', /(SYSTEM_MODE|USER_MODE)/],
    scope: {
      1: 'built_in',
      3: 'keyword'
    }
  };

  /* const MERGE_FIELDS = {
    begin: ['{', /\$[a-zA-Z]+]/, '.', /\w+/],
    end: '}',
    beginScope: {
      1: 'punctuation',
      2: 'built_in',
      4: 'property'
    },
    endScope: 'punctuation'
  }; */

  const ASSIGNMENTS = [
    {
      // Account a =
      match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s+/, /=/],
      scope: {
        1: 'type',
        3: 'variable',
        5: 'operator'
      },
      relevance: 0
    },
    {
      // Account abcd;
      match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s+/, ';'],
      scope: {
        1: 'type',
        3: 'variable'
      },
      relevance: 0
    },
    {
      // mynum =
      match: [/\s+/, APEX_IDENT_RE, /\s+/, /=/],
      scope: {
        2: 'variable',
        4: 'operator'
      },
      relevance: 0
    } /* ,
    {
      // TODO: Figure out what this was doing, and remove the non-fixed width lookbehind
      match: [/(?<=\w+\s+=\s+\()/, APEX_IDENT_RE, /(?=\))/],
      scope: {
        2: 'type'
      },
      relevance: 0
    } */
  ];

  const RETURNS = [
    {
      match: [/(?<=return)/, /\s+/, APEX_IDENT_RE, /(?=\s*;)/],
      scope: {
        3: 'variable'
      }
    },
    {
      begin: [/(?<=return)/, /\s+/, APEX_IDENT_RE, /\(/],
      end: /\)/,
      beginScope: {
        3: 'title.function.invoke'
      },
      contains: [PARAM_VARS]
    }
  ];

  const SALESFORCE_ID = {
    match: /(?<!\.)\bId\b/,
    scope: 'type',
    relevance: 8
  };

  /**
   * SOQL SECTION
   */

  const SOQL_KEYWORDS = [
    'ABOVE_OR_BELOW',
    'ACTIVE',
    'ADVANCED',
    'ALL',
    'ANY',
    'ARRAY',
    'AS',
    'BY',
    'CATEGORY',
    'CONTAINS',
    'CUSTOM',
    'DATA',
    'DIVISION',
    'END',
    'FIELDS',
    'FIND|10',
    'LAST',
    'METADATA',
    'NETWORK',
    'ON',
    'RETURNING',
    'ROLLUP',
    'ROWS',
    'SEARCH',
    'SECURITY_ENFORCED',
    'SELECT',
    'SNIPPET',
    'SORT',
    'STANDARD',
    'USER_MODE',
    'WHERE'
  ];

  const SOQL_OPERATORS = [
    ':',
    'ABOVE',
    'AND',
    'ASC',
    'AT',
    'DESC',
    'DISTANCE',
    'FROM',
    'HAVING',
    'IN',
    'LIKE',
    'LIMIT',
    'LISTVIEW',
    'NOT',
    'OFFSET',
    'OR',
    'TRACKING',
    'TYPEOF',
    'UPDATE',
    'USING',
    'VIEWSTAT',
    'YESTERDAY',
    /FOR\s+REFERENCE/,
    /FOR\s+UPDATE/,
    /FOR\s+VIEW/,
    /GROUP\s+BY/,
    /NOT\s+IN/,
    /NULLS\s+FIRST/,
    /NULLS\s+LAST/,
    /ORDER\s+BY/,
    //WITH/,
    /WITH\s+DATA\s+CATEGORY/,
    /WITH\s+PricebookId/
  ];

  const SOQL_FUNCTIONS = [
    'AVG',
    'convertCurrency',
    'convertTimezone',
    'COUNT',
    'COUNT_DISTINCT',
    'DAY_IN_MONTH',
    'DAY_IN_WEEK',
    'DAY_IN_YEAR',
    'DAY_ONLY',
    'toLabel',
    'INCLUDES',
    'EXCLUDES',
    'FORMAT',
    'GROUPING',
    'GROUP BY CUBE',
    'GROUP BY ROLLUP',
    'HOUR_IN_DAY',
    'MAX',
    'MIN',
    'SUM',
    'WEEK_IN_MONTH',
    'WEEK_IN_YEAR'
  ];

  const SOQL_DATES = [
    'CALENDAR_MONTH',
    'CALENDAR_QUARTER',
    'CALENDAR_YEAR',
    'FISCAL_MONTH',
    'FISCAL_QUARTER',
    'FISCAL_YEAR',
    'TODAY',
    'TOMORROW'
  ];

  const SOQL_SCOPE = [
    'Delegated',
    'Everything',
    'Mine',
    'My_Territory',
    'My_Team_Territory',
    'Team'
  ];

  const SOQL_QUERY = {
    begin: /\[\s*\b(SELECT|FIND)\b/,
    end: /\]/,
    scope: 'soql',
    relevance: 10,
    contains: [
      {
        begin: regex.concat(/\b/, regex.either(...SOQL_KEYWORDS), /\b/),
        scope: 'keyword'
      },
      {
        match: regex.concat(/\b/, regex.either(...SOQL_OPERATORS), /\b/),
        scope: 'operator',
        relevance: 0
      },
      {
        match: regex.concat(/\b/, regex.either(...SOQL_FUNCTIONS), /\b/),
        scope: 'title.function.invoke'
      },
      {
        match:
          /(NEXT|LAST|THIS)_(N_)?(90_DAY|DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S?/,
        scope: 'literal'
      },
      {
        match: regex.concat(/\b/, regex.either(...SOQL_DATES), /\b/),
        scope: 'literal'
      },
      //{
      //   match: /(\bIN\b|<|<=|>|>=|\bNOT\s+IN\b|=|!\s*=|\s:{1}|:{1}\s)/,
      //   scope: 'literal'
      //},
      /* {
        match: [/(?<=\bFROM\b\s+)/, APEX_IDENT_RE, /\./, APEX_IDENT_RE],
        scope: { 2: 'type', 4: 'type' },
        relevance: 0
      }, */
      {
        match: /(?<=\bFROM\b\s+)\w+/,
        scope: 'type',
        relevance: 0
      },
      {
        match: [/\bUSING\s+SCOPE\b\s+/, regex.either(...SOQL_SCOPE)],
        scope: { 1: 'variable.language', 2: 'variable.language' }
      },
      {
        match: [
          /(NEXT|LAST|THIS)_(N_)?(90_DAY|DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S?/,
          /\s*/,
          ':',
          /\s*/,
          /[0-9]+\b/
        ],
        scope: {
          1: 'variable.language',
          3: 'punctuation',
          5: 'number'
        },
        relevance: 10
      },
      {
        match: [/(?<=:)/, /\s*/, APEX_IDENT_RE],
        scope: { 3: 'variable' }
      },
      {
        match: /[(:)]/,
        scope: 'punctuation',
        relevance: 0
      },
      NUMBER,
      METHOD_CALL,
      hljs.APOS_STRING_MODE,
      OPERATORS
    ],
    illegal: '::'
  };

  const FOR_LOOP = {
    // Treat this loop specifically because it can take a query
    // Leave do/while to regular highlighting
    variants: [
      {
        //for (APTask__c apTask : myTasks
        match: [
          /\bfor\b/,
          /\s*\(/,
          APEX_IDENT_RE,
          /\s+/,
          APEX_IDENT_RE,
          /\s*:/,
          /(?=\s*\[)/
        ],
        scope: {
          1: 'keyword',
          3: 'type',
          5: 'variable',
          6: 'punctuation'
        }
      },
      {
        match: [
          /\bfor\b/, //1 for
          /\s*\(/, //2 (
          APEX_IDENT_RE, //3 Account
          /\s+/,
          APEX_IDENT_RE, //5 a
          /\s*:/, //6 :
          /\s*/,
          APEX_IDENT_RE //8 myList
        ],
        scope: {
          1: 'keyword',
          2: 'punctuation',
          3: 'type',
          5: 'variable',
          8: 'variable'
        }
      }
    ],
    contains: [COMMENT_LINE, COMMENT_BLOCK, SOQL_QUERY]
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
    '"""',
    /\+\+\+/,
    /=>/,
    /<%/,
    '<%#',
    '%%>',
    '<%%'
    // /"[^"]+"/, // Quote_string_mode
    // /@\w+\[\w+\]/ //moonscript
  ];

  const KEYWORDS = {
    $pattern: APEX_IDENT_RE,
    keyword: MAIN_KEYWORDS,
    'variable.language': LANGUAGE_VARS,
    built_in: [...BUILT_INS, ...DMLS, ...NAMESPACE_LIST],
    type: TYPES,
    literal: LITERALS,
    classNameAliases: {
      soql: 'subst'
    }
  };

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
      COLLECTION_VALUE,
      COMMENT_BLOCK,
      COMMENT_LINE,
      COMPOUND_KEYWORDS,
      CUSTOM_METADATA,
      DML_SECURITY,
      EXCEPTION,
      FOR_LOOP,
      hljs.APOS_STRING_MODE,
      INSTANTIATE,
      METHOD_CALL,
      //MERGE_FIELDS,
      NAMESPACES,
      NUMBER,
      OPERATORS,
      PUNCTUATION,
      RETURNS,
      SALESFORCE_ID,
      SOQL_QUERY,
      SYSTEM_INVOKE,
      //ANNOTATION_ATTRIBUTE_PARAMS,
      IMPORTANT_WORDS
    ]
  };
}
