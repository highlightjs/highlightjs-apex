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
  const ANNOTATION_RE = '@' + APEX_IDENT_RE;

  const NUMBERS = {
    scope: 'number',
    match: regex.either(
      /\b(\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{1,3})?(\-|\+)\d{2}\:\d{2})\b/, //datetime
      /\b(\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{1,3})?(Z)?)\b/, //datetime
      /\b(\d{4}\-\d{2}\-\d{2})\b/, //date
      /\b0(x|X)[0-9a-fA-F_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //hex
      /\b0(b|B)[01_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //binary
      /\b([0-9_]+)?\.[0-9_]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\b/, //decimal
      /\b[0-9_]+(e|E)[0-9_]+(F|f|D|d|M|m)?\b/, //decimal
      /\b[0-9_]+(F|f|D|d|M|m)\b/, //decimal
      /\b[0-9_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/ //decimal
    ),
    relevance: 0
  };

  const MAIN_KEYWORDS = [
    'cast',
    'default',
    'export',
    
    'try',
    'catch',
    'finally',

    'get',
    'set',
    'put',

    'if',
    'else',
    'do',
    'while',

    'continue',
    'break',

    'return',
    'throw',
    'when'
  ];

  const LANGUAGE_VARS = [
    'instanceof',
    'new',
    'super',
    'this'
  ];

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

  const STORAGE_MODIFIER = {
    match: regex.concat(
      /(?<!\.)\b/,
      regex.either(...STORAGE_MODIFIER_LIST),
      /\b/
    ),
    scope: 'keyword',
    relevance: 0
  };

  const LITERALS = ['false', 'true', 'null'];

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

  const BUILT_INS = [
    'start',
    'execute',
    'finish',
    'schedulable|10',
    'batchable|10',
    'queueable|10',
    'comparable|10',
    'callable|10'
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

  const NAMESPACES = [
    // * SYSTEM ENUMS W/WO SYSTEM SPECIFIED
    {
      match: [
        /\bSystem/,
        /\./,
        regex.either(...SYSTEM_ENUMS),
        /\./,
        APEX_IDENT_RE
      ],
      scope: {
        1: 'built_in',
        /* 2: 'punctuation', */ 3: 'built_in',
        /* 4:'punctuation', */ 5: 'variable.constant'
      },
      relevance: 10
    },
    {
      match: [/\b/, regex.either(...SYSTEM_ENUMS), /\./, APEX_IDENT_RE, /\b/],
      // TODO: Find a better scope for the enum value
      scope: { 2: 'built_in', 4: 'variable.constant' }
    },
    // ANY USE OF SYSTEM BASE
    {
      match: [/\bSystem/, /\./, APEX_IDENT_RE, /(?=\.)/],
      scope: { 1: 'built_in', /* 2: 'punctuation', */ 3: 'title.class' },
      relevance: 10
    },
    {
      match: [
        regex.concat(/\b/, regex.either(...NAMESPACE_LIST)),
        /\./,
        APEX_IDENT_RE,
        /(?=\s*\()/
      ],
      scope: {
        1: 'built_in',
        /* 2: 'punctuation', */ 3: 'title.function.invoked'
      }
    },
    {
      match: [/\b/, regex.either(...NAMESPACE_LIST), /\b(?!\.)/],
      scope: { 2: 'built_in' }
    },
    {
      match: [
        /\b/,
        regex.either(...SYSTEM_CLASSES),
        /\./,
        APEX_IDENT_RE,
        /(?=\()/
      ],
      scope: { 2: 'title.class', 4: 'title.function.invoke' },
      relevance: 9
    },
    {
      match: [/\b/, regex.either(...SYSTEM_CLASSES), /(?=\.)/],
      scope: { 2: 'title.class' },
      relevance: 9
    },
    {
      match: [/\b/, regex.either(...SYSTEM_INTERFACES), /\b/],
      scope: { 2: 'title.class.inherited' },
      relevance: 10
    }
  ];

  const SWITCH_STATEMENT = {
    match: [/\bswitch\s+on\s+/, APEX_IDENT_RE],
    scope: { 1: 'keyword', 2: 'variable' }
  };

  const OPERATOR_REGEX = [
    /%|\*|\/|-|\+/,
    /--/,
    /~/,
    /\*/,
    /\+=|-=|\^=|\/=|\*=/,
    /%[^%]/,
    /\+\+/,
    /<<|>>/,
    />=|<=/,
    /\s<\s|\s>\s/,
    /\^/,
    /==|!=|!/,
    /\\&|~|\^|\|/,
    /\&\&/,
    /\&/,
    /\|\|/,
    /\|/,
    /(?<=\s)\?|:(?=\s)/, // standalone ? or : (ternary operator?)
    /=/,
    /\?\./,
    /(?<!\?)\?(?!\?|\.|\[)/ // ternary operator or CONDITIONAL_OPERATOR
  ];

  const OPERATORS = {
    match: regex.either(...OPERATOR_REGEX),
    scope: 'operator',
    relevance: 0
  };

  const PUNCTUATION_REGEX = [
    /(\{|\})/,
    ',',
    /\(|\)/,
    ';'
    // /(?<!\?)\./ //"Period/dot"
  ];

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
        begin: /@[A-Za-z_]+\s/,
        scope: 'doctag'
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
      hljs.inherit(hljs.APOS_STRING_MODE, { className: 'meta string' }),
      {
        match: [/(?<=@param)/, /\s+/, /\S+/],
        scope: {
          3: 'variable'
        }
      },
      {
        match: [/@(?:exception|throws)/, /\s+/, /\S+/],
        scope: { 1: 'doctag', 3: 'class.title' }
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

  /* const ANNOTATION_KEYS = [
    'label',
    'description',
    'callout',
    'required',
    'category',
    'configurationEditor',
    'iconName',
    'SeeAllData'
  ]; */

  const ANNOTATIONS = [
    // We will allow any annotation, so we do not need to maintain this as often
    //match: [regex.either(...APEX_ANNOTATIONS), /(?=(\(|\b|\s))/],
    {
      // Type 1: one annotation
      // @isTest
      match: regex.concat(ANNOTATION_RE, /\b(?!\s*\()/), //, /(?=(\(|\b|\s))/]
      scope: 'meta SOLO'
    },
    // Type 2: annotation and parentheses
    // @SuppressWarnings('PMD.AvoidGlobalModifier'))
    // Type 3: annotation on one line and parentheses on next
    // @IsTest
    // (Seealldata=true)
    {
      begin: [regex.concat(ANNOTATION_RE, /\b/), /\s*\(/],
      beginScope: { 1: 'meta annotations', 2: 'punctuation' },
      end: /\)/,
      endScope: 'punctuation end',
      //returnEnd: true,
      scope: 'annotation',
      contains: [
        {
          match: [/\b/, APEX_IDENT_RE, /\s*=/],
          scope: {
            2: 'meta keyword',
            3: 'operator'
          }
        },
        hljs.APOS_STRING_MODE,
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
      match: [/\b[a-zA-Z0-9\.]*Exception\b/, /\s+/, APEX_IDENT_RE],
      scope: { 1: 'title.class', 3: 'variable' },
      relevance: 0
    }
  ];

  const COLLECTION_DECLARATION = [
    {
      scope: 'collection',
      begin: /\b(list|set|map)\s*(?=<)/,
      beginScope: 'type',
      end: />+/,
      endScope: 'punctuation',
      contains: [
        {
          match: /</,
          scope: 'punctuation'
        },
        PUNCTUATION,
        {
          match: regex.concat(/\b/, APEX_IDENT_RE, /\b/),
          scope: 'type'
        }
      ],
      relevance: 10
    },
    {
      // array notation
      match: [APEX_IDENT_RE, /(?=\s*\[\])/],
      scope: {
        1: 'type'
      },
      contains: [PUNCTUATION]
    }
  ];

  const CUSTOM_METADATA = {
    // Custom fields, types, etc.
    match: [
      /(?<!(\w|[^\.]))/,
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

  const PARAMS = {
    scope: 'params',
    begin: /\(/,
    beginScope: 'punctuation',
    end: /\)/,
    endScope: 'punctuation',
    endsParent: true,
    contains: [
      NUMBERS,
      hljs.APOS_STRING_MODE,
      OPERATORS,
      COLLECTION_DECLARATION,
      {
        match: regex.concat(/\b/, regex.either(...LITERALS), /\b\s*(?=[,)])/),
        scope: 'literal'
      },
      {
        // mymethod(c.Id, c.Name); highlights each part of each parameter
        // must be followed by comma or paren
        match: [/(?<=[,\(])\s*(${APEX_IDENT_RE})/, /\./, APEX_IDENT_RE, /\s*(?=[,)])/],
        scope: { 1: 'variable', 3: 'property' }
      },
      {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: [/(?<=[,\(])\s*(${APEX_IDENT_RE})/, /\s+/, APEX_IDENT_RE, /\s*(?=[,)])/],
        scope: { 1: 'type', 3: 'variable' }
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
      begin: [/\bnew\b/, /\s+/, APEX_IDENT_RE, /\s*(?=\()/],
      beginScope: {
        1: 'keyword',
        3: 'title.function.invoke'
      },
      end: /\)/,
      returnEnd: true,
      //endScope: 'punctuation',
      scope: 'instantiate',
      contains: [PARAMS, COMMENT_LINE, PUNCTUATION],
      illegal: ':'
    }
  ];

  const PARAMS_CALL = {

  };

  const METHOD_CALL = {
    end: /(?=\)\s*[^{])/,
    returnEnd: true,
    scope: 'method call',
    variants: [
      {
        begin: regex.concat(APEX_IDENT_RE, /(?=\s*\()/),
        beginScope: 'title.function.invoke',
      },
      {
        begin: [APEX_IDENT_RE, /\./, /(${APEX_IDENT_RE})(?=\s*\()/],
        beginScope:  {1: 'class.title', 3: 'title.function.invoke'},
      }
    ],
     contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      hljs.APOS_STRING_MODE,
      PARAMS,
      INSTANTIATE,
      /* {
        begin: [/\bthis/,/\(/],
        returnBegin: true,
        end: /\)/,
        returnEnd: true,
        contains: [PARAMS]
      } */
    ],
    relevance: 0
  };

  // * TRIGGER DECLARATION

  const TRIGGER_PROPERTIES = [
    // will be scoped as keywords
    'isExecuting',
    'isInsert',
    'isUpdate',
    'isDelete',
    'isBefore',
    'isAfter',
    'isUndelete',
    'new',
    'newMap',
    'old',
    'oldMap',
    'size',
    'operationType'
  ];

  const TRIGGER_CONTEXT_DECLARATION = {
    match: [/\bTrigger\b/, /\./, regex.either(...TRIGGER_PROPERTIES), /\b/],
    scope: { 1: 'built_in', 3: 'keyword' },
    relevance: 10
  };

  const TRIGGER_DECLARATION = {
    begin: [
      /\btrigger/,
      /\s+/,
      APEX_IDENT_RE,
      /\s+/,
      'on',
      /\s+/,
      APEX_IDENT_RE
    ],
    beginScope: {
      1: 'keyword',
      3: 'title.class',
      5: 'operator',
      7: 'type'
    },
    end: '{',
    //endScope: 'punctuation end',
    returnEnd: true,
    scope: 'trigger_declaration',
    contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      {
        begin: /\(/,
        beginScope: 'punctuation',
        end: /\)/,
        endScope: 'punctuation',
        scope: 'trigger_params',
        contains: [
          {
            match: /\b(before|after)\s+(insert|update|delete|merge|undelete)\b/,
            scope: 'built_in'
          }
        ]
      }
    ]
  };

  // * CLASS DECLARATION

  const CLASS_DECLARATION = {
    begin: [/\bclass\b/, /\s+/, APEX_IDENT_RE],
    beginScope: { 1: 'keyword', 3: 'title.class' },
    end: /\{/,
    endScope: 'punctuation',
    scope: 'class-declaration',
    contains: [
      {
        match: /\b(extends|implements)\b/,
        scope: 'keyword'
      },
      {
        match: regex.concat(/\b/, regex.either(...BUILT_INS), /\b/),
        scope: 'title.class.inherited'
      },
      {
        match: [regex.either(...NAMESPACE_LIST), /\./, /\w+/],
        scope: {
          1: 'built_in',
          /* 2:'punctuation', */ 3: 'title.class.inherited'
        }
      },
      {
        match: [/\b/, APEX_IDENT_RE, />/],
        scope: { 2: 'type', 3: 'punctuation' }
      },
      {
        match: regex.concat(/\b/, APEX_IDENT_RE, /(?=[,\s<])/),
        scope: { 2: 'title.class.inherited' }
      },
      {
        match: [/\b/, APEX_IDENT_RE, /\./, APEX_IDENT_RE, /(?=[,\s<])/],
        scope: { 1: 'built_in', 3: 'title.class.inherited' }
      }
    ]
  };

  const ENUM_DECLARATION = {
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
    ]
  };

  const CLASS_SHARING = {
    relevance: 10,
    match: /\b(with|without|inherited)\s+sharing\b/,
    scope: 'keyword'
  };

  /* const CONSTRUCTOR_DECLARATION = [
    {
      // Constructor
      // Matches public/private, methodname, then parens and a curly bracket

      begin: [/(?<=(public|private))/, /\s+/, APEX_IDENT_RE, /(?=\s*\()/], // /(?=\s*\()/],
      beginScope: {
        3: 'constructor'
      },
      end: /\)\s*{/,
      contains: [PARAMS]
    }
  ]; */

  

  const DECLARATIONS = [
    TRIGGER_DECLARATION,
    CLASS_SHARING,
    TRIGGER_CONTEXT_DECLARATION,
    ENUM_DECLARATION
    //CONSTRUCTOR_DECLARATION,
  ].concat(CLASS_DECLARATION);

  const ASSIGNMENTS = [
    {
      // Account a =
      match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s+/, /(?==)/],
      scope: {
        1: 'type',
        3: 'variable'
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
      match: [/\s+/, APEX_IDENT_RE, /\s+/, /(?==)/],
      scope: {
        2: 'variable'
      },
      relevance: 0
    },

    // Casting
    {
      match: [/(?<==)\s*/, /\(/, APEX_IDENT_RE, /\)/],
      scope: { 2: 'punctuation', 3: 'type', 4: 'punctuation' }
    }
  ];

  const RETURNS = [
    {
      match: [/(?<=\breturn\b)\s+/, regex.either(LITERALS), /(?=\s*;)/],
      scope: {
        2: 'literal'
      }
    },
    {
      match: [/(?<=return)/, /\s+/, APEX_IDENT_RE, /(?=\s*;)/],
      scope: {
        3: 'variable'
      }
    },
    {
      match: [/(?<=return)/, /\s+/, /(?=(${APEX_IDENT_RE})\()/],
      //returnBegin: true,
      //end: /(?=\))/,
      scope: {
        2: 'title.function.invoke'
      }, 
      //contains: [METHOD_CALL, PARAMS]
    }
    // * RETURN NEW OBJECT - NO PARAMS BY DEFAULT
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
    'FIND',
    'FROM',
    'LAST',
    'METADATA',
    'NETWORK',
    'ON',
    'RETURNING',
    'ROLLUP',
    'ROWS',
    'SEARCH',
    'SELECT',
    'SNIPPET',
    'SORT',
    'STANDARD',
    'USER_MODE',
    'WHERE',
    /USING\s+SCOPE\s*(Delegated|Everything|Mine|My_Territory|My_Team_Territory|Team)/,
    /WITH\s+SECURITY_ENFORCED/
  ];

  const SOQL_OPERATORS = [
    'ABOVE',
    'AND',
    'ASC',
    'AT',
    'DESC',
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
    'VIEWSTAT',
    /FOR\s+REFERENCE/,
    /FOR\s+UPDATE/,
    /FOR\s+VIEW/,
    /GROUP\s+BY/,
    /NOT\s+IN/,
    /NULLS\s+(FIRST|LAST)/,
    /ORDER\s+BY/,
    /WITH/,
    /DATA\s+CATEGORY/,
    /WITH\s+PricebookId/
  ];

  const SOQL_FUNCTIONS = [
    'AVG',
    'convertCurrency',
    'convertTimezone',
    'COUNT_DISTINCT',
    'COUNT',
    'DAY_IN_MONTH',
    'DAY_IN_WEEK',
    'DAY_IN_YEAR',
    'DAY_ONLY',
    'DISTANCE',
    'EXCLUDES',
    'FORMAT',
    'GEOLOCATION',
    'GROUP BY CUBE',
    'GROUP BY ROLLUP',
    'GROUPING',
    'HOUR_IN_DAY',
    'INCLUDES',
    'MAX',
    'MIN',
    'SUM',
    'toLabel',
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
    'TOMORROW',
    'YESTERDAY'
  ];

  const SOQL_QUERY = {
    begin: [/\[/, /\s*/, /\b(SELECT|FIND)\b/],
    beginScope: { 1: 'punctuation', 3: 'keyword for soql' },
    //returnBegin: true,
    end: /\]/,
    endScope: 'punctuation outer',
    //returnEnd: true,
    scope: 'soql',
    relevance: 10,
    //endsParent: true,
    contains: [
      {
        begin: [/\bFROM\b/, regex.concat(/\s+/, APEX_IDENT_RE, /\b/)],
        beginScope: {
          1: 'keyword',
          2: 'type'
        },
        scope: 'from clause',
        end: /(?=\]|\s)/,
        //endScope: 'punctuation',
        contains: [
          {
            match: [/(?<=\.)/, APEX_IDENT_RE, /\b/],
            scope: { 2: 'type' }
          },
          PUNCTUATION
        ]
      },
      {
        match: /\]/,
        scope: 'punctuation',
        endsParent: true
      },
      {
        match: /IN|=\s*:/,
        scope: 'operator'
      },
      {
        begin: regex.concat(/\b/, regex.either(...SOQL_KEYWORDS), /\b/),
        scope: 'keyword',
        relevance: 0
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
        match: regex.concat(/\b/, regex.either(...SOQL_DATES), /\b/),
        scope: 'literal' // use variable.language?
      },
      {
        match:
          /(NEXT|LAST|THIS)_(90_DAY|DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S?\b/,
        scope: 'variable.language',
        relevance: 10
      },
      {
        match: [
          /(NEXT|LAST)_N_(DAY|FISCAL_QUARTER|FISCAL_YEAR|MONTH|QUARTER|WEEK|YEAR)S/,
          /\s*:\s*/,
          /\d+/
        ],
        scope: {
          1: 'variable.language',
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
      PUNCTUATION,
      hljs.APOS_STRING_MODE
    ],
    illegal: '::'
  };

  const FOR_LOOP = {
    begin: [/\bfor\b/, /\s*\(/, APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s*:/],
    beginScope: {
      1: 'keyword',
      2: 'punctuation',
      3: 'type',
      5: 'variable',
      6: 'punctuation'
    },
    end: '{',
    contains: [COMMENT_LINE, COMMENT_BLOCK, SOQL_QUERY]
  };

  // TODO: Do DMLs
  const DML_OPERATIONS = [
    {
      // delete myAccount;
      match: [
        regex.concat(/\b/, regex.either(...DMLS), /\b/),
        /\s*/,
        APEX_IDENT_RE,
        /(?=;)/
      ],
      scope: { 1: 'built_in', 3: 'variable' }
    },
    {
      match: regex.concat(/\b/, regex.either(...DMLS), /\b/),
      scope: 'built_in'
    },
    {
      match: [
        /\s+/,
        /(?:\bas\s+(user|system)\b\s+)?/,
        APEX_IDENT_RE,
        regex.lookahead(';')
      ],
      scope: { 2: 'built_in', 3: 'variable' }
    },
    /*
     * DML types
     * naked - insert a;
     *
     */
    {
      begin: regex.concat(/\b/, regex.either(...DMLS), /\b/),
      //returnBegin: true,
      beginScope: 'built_in',
      scope: 'DML',
      contains: [
        INSTANTIATE,
        {
          match: [
            regex.concat('(?<=', regex.either(DMLS), ')'),
            /\s+/,
            /(?:\bas\s+(user|system)\b\s+)?/,
            APEX_IDENT_RE,
            regex.lookahead(';')
          ],
          scope: { 3: 'built_in', 4: 'variable' }
        },
        {
          match: regex.either(DMLS),
          scope: 'built_in'
        },
        PUNCTUATION
      ]
    },
    {
      // TODO: Pick better scopes here
      match: ['AccessLevel', /\./, /(SYSTEM_MODE|USER_MODE)/],
      scope: {
        1: 'built_in',
        3: 'keyword'
      }
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

  return {
    name: 'Apex',
    aliases: ['apex', 'lightning'],
    case_insensitive: true, // language is case-insensitive
    disableAutodetect: false,
    ignoreIllegals: false,
    keywords: {
      $pattern: APEX_IDENT_RE,
      keyword: MAIN_KEYWORDS,
      'variable.language': LANGUAGE_VARS,
      built_in: BUILT_INS,
      type: TYPES,
      literal: LITERALS,
      //punctuation: PUNCTUATION_REGEX,
      classNameAliases: {
        soql: 'subst'
      }
    },
    illegal: ILLEGALS,
    contains: [
      ANNOTATIONS,
      ASSIGNMENTS,
      COLLECTION_DECLARATION,
      COMMENT_BLOCK,
      COMMENT_LINE,
      CUSTOM_METADATA,
      DECLARATIONS,
      DML_OPERATIONS,
      EXCEPTION,
      FOR_LOOP,
      hljs.APOS_STRING_MODE,
      INSTANTIATE,
      //KEYWORDS,
      METHOD_CALL,
      NAMESPACES,
      NUMBERS,
      OPERATORS,
      PUNCTUATION,
      RETURNS,
      SALESFORCE_ID,
      SOQL_QUERY,
      STORAGE_MODIFIER,
      SWITCH_STATEMENT
    ]
  };
}
