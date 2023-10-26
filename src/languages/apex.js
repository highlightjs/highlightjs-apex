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
      /\b([0-9]+)?\.[0-9]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\b/, //decimal
      /(-?)\b[0-9]+(e|E)[0-9]+(F|f|D|d|M|m)?\b/, //decimal
      /(-?)\b[0-9]+(F|f|D|d|M|m)\b/, //decimal
      /(-?)\b[0-9]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //decimal
      /(-?)(\b0[0-9]+|(\b\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)/ // C_NUMBER_MODE
    ),
    relevance: 0
  };

  const MAIN_KEYWORD_LIST = [
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
    'when'
  ];

  const LANGUAGE_VAR_LIST = ['instanceof', 'new', 'super', 'this'];

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

  const DMLS = [
    'insert',
    'update',
    'upsert|8',
    'delete',
    'undelete',
    'merge',
    'convertLead|8'
  ];

  const BUILT_INS = []
    .concat(
      ...[
        'start',
        'execute',
        'finish',
        'schedulable|10',
        'batchable|10',
        'queueable|10',
        'comparable|10',
        'callable|10'
      ]
    )
    .concat(...DMLS);

  const NAMESPACE_LIST = [
    'ApexPages',
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
    'Schema',
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

  const LITERAL_RE = {
    match: regex.concat(/\b/, regex.either(...LITERALS), /\b\s*(?=[,)])/),
    scope: 'literal regex',
    relevance: 0
  };

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
        1: 'built_in' /* 2: 'punctuation', */,
        3: 'built_in' /* 4:'punctuation', */,
        5: 'variable.constant'
      },
      relevance: 9
    },
    {
      match: [
        regex.concat(/\b/, regex.either(...SYSTEM_ENUMS)),
        /\./,
        APEX_IDENT_RE,
        /\b(?![\.\(])/
      ],
      // TODO: Find a better scope for the enum value
      scope: { 1: 'built_in', 3: 'variable.constant' },
      relevance: 0
    },
    // ANY USE OF SYSTEM (or other Namespace) BASE
    {
      match: [
        regex.either(...NAMESPACE_LIST),
        /\./,
        regex.concat('(?=', APEX_IDENT_RE, '\\.)')
      ],
      scope: { 1: 'built_in' }
    },
    {
      match: [
        regex.concat(/\b/, regex.either(...NAMESPACE_LIST)),
        /\./,
        regex.concat('(?=', APEX_IDENT_RE, '\\s*\\()')
      ],
      scope: {
        1: 'built_in',
        /* 2: 'punctuation', */ 3: 'title.function.invoked'
      },
      relevance: 10
    },
    {
      match: [/\b/, regex.either(...NAMESPACE_LIST), /\b(?!\.)/],
      scope: { 2: 'built_in' }
    },
    {
      match: [
        regex.concat(/\b/, '(?<=', regex.either(...SYSTEM_CLASSES), ').'),
        APEX_IDENT_RE,
        /(?=\()/
      ],
      scope: { 2: 'title.class', 4: 'title.function.invoke' },
      relevance: 4
    },
    {
      match: [/\b/, regex.either(...SYSTEM_CLASSES), /(?=\.)/],
      scope: { 2: 'title.class' },
      relevance: 4
    }
  ];

  const SWITCH_STATEMENT = {
    match: [/\bswitch\s+on\s+/, APEX_IDENT_RE],
    scope: { 1: 'keyword', 2: 'variable' }
  };

  const OPERATOR_LIST = [
    //=/,
    //(?<=')\s*\+/, // string concat before
    //\+(?=\s*')/, // string concat after
    /(?<!=|!)\=(?!=|>)/, // assignment
    ///(\=/, // assignment

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

  const OPERATOR_RE = {
    match: regex.concat(regex.either(...OPERATOR_LIST), '{1}'),
    //match: /((?<!\+)\+(?!\+)|(\=)){1}/,
    scope: 'operator',
    relevance: 0
  };

  const PUNCTUATION_LIST = [
    /(\{|\})/,
    ',',
    /\(|\)/,
    ///\[|\]/,
    ';'
    // /(?<!\?)\./ //"Period/dot"
  ];

  const PUNCTUATION_RE = {
    match: regex.either(...PUNCTUATION_LIST),
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
        match: [/@(?:exception|throws)/, /\s+/, APEX_IDENT_RE],
        scope: { 1: 'doctag', 3: 'class.title' }
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
      hljs.inherit(hljs.APOS_STRING_MODE, { scope: 'meta string' }),
      {
        match: [/(?<=@param)/, /\s+/, /\S+/],
        scope: {
          3: 'variable'
        }
      }
    ]
  });

  const ANNOTATIONS = [
    // We will allow any annotation, so we do not need to maintain this as often
    //match: [regex.either(...APEX_ANNOTATIONS), /(?=(\(|\b|\s))/],
    {
      // Type 1: one annotation
      // @isTest
      match: regex.concat(ANNOTATION_RE, /\b(?!\s*\()/), //, /(?=(\(|\b|\s))/]
      scope: 'meta' //SOLO
    },
    // Type 2: annotation and parentheses
    // @SuppressWarnings('PMD.AvoidGlobalModifier'))
    // Type 3: annotation on one line and parentheses on next
    // @IsTest
    // (Seealldata=true)
    {
      begin: [regex.concat(ANNOTATION_RE, /\b/), /\s*\(/],
      beginScope: { 1: 'meta' },
      end: /\)/,
      //endScope: 'punctuation', //END
      returnEnd: true,
      scope: 'annotation',
      contains: [
        {
          match: [regex.concat(/\b/, APEX_IDENT_RE), /(?=\s*=)/],
          scope: {
            1: 'meta keyword' //,2: 'operator'
          },
          contains: [OPERATOR_RE]
        },
        hljs.inherit(hljs.APOS_STRING_MODE, { scope: 'meta string' }),
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
    // TODO: make a matcher for each type (map, list, set) with all the ways to initialize
    // * List<Type>
    // * Type[] <- array notation
    // * Set<Type>
    // * Map<Type, Type>() <- allow for parens and for SOQL
    // * Map<Id, CustomObject__c> myMap = new Map<Id, CustomObject__c>([Select z.Name, z.Id From CustomObject__c z]);
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
        PUNCTUATION_RE,
        {
          match: regex.concat(/\b/, APEX_IDENT_RE, /\b/),
          scope: 'type'
        }
      ],
      relevance: 10
    },
    {
      // array notation
      match: [APEX_IDENT_RE, /\s*\[\]/],
      scope: {
        1: 'type',
        2: 'punctuation'
      },
      contains: [PUNCTUATION_RE],
      relevance: 0
    }
  ];

  const ASSIGNMENTS = {
    scope: 'assignment',
    relevance: 0,
    contains: [PUNCTUATION_RE, OPERATOR_RE],
    variants: [
      {
        // Account a =
        match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /(?=\s*\=)/],
        scope: {
          1: 'type',
          3: 'variable assigned'
        }
      },
      {
        // Account abcd;
        match: [APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s*/, ';'],
        scope: {
          1: 'type',
          3: 'variable declare'
        }
      },
      {
        // mynum =
        // could also be a collection variable
        match: [/(?<!\.)\b/, APEX_IDENT_RE, /(?=\s*\=)/],
        scope: {
          2: 'variable mynum'
        }
      },
      // Casting
      {
        match: [/(?<==)\s*/, /\(/, APEX_IDENT_RE, /\)/],
        scope: { 2: 'punctuation', 3: 'type', 4: 'punctuation' }
      }
    ]
  };
  // Can use later; omitted for now
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
    relevance: 0,
    contains: [
      NUMBERS,
      hljs.APOS_STRING_MODE,
      COMMENT_LINE,
      COMMENT_BLOCK,
      OPERATOR_RE,
      ASSIGNMENTS,
      COLLECTION_DECLARATION,
      LITERAL_RE,
      NAMESPACES,
      NUMBERS,
      'self',
      {
        // mymethod(c.Id, c.Name); highlights each part of each parameter
        // must be followed by comma or paren
        match: [
          regex.concat(/(?<=[,\(])\s*/, APEX_IDENT_RE),
          /\./,
          APEX_IDENT_RE,
          /\s*(?=[,)])/
        ],
        scope: { 1: 'variable', 3: 'variable' }
      },
      {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: [
          regex.concat(/\b/, APEX_IDENT_RE),
          /\s+/,
          APEX_IDENT_RE,
          /\s*(?=[,)])/
        ],
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
      contains: [PARAMS, COMMENT_LINE, PUNCTUATION_RE],
      illegal: ':',
      relevance: 0
    }
  ];

  const PARAMS_CALL = {};

  const METHOD_CALL = {
    end: /(?=\)\s*[^{])/,
    returnEnd: true,
    scope: 'method_call',
    relevance: 0,
    variants: [
      {
        begin: regex.concat(APEX_IDENT_RE, /(?=\s*\()/),
        beginScope: 'title.function.invoke'
      },
      {
        begin: [
          regex.either(...NAMESPACE_LIST),
          /\./,
          regex.concat(APEX_IDENT_RE, /(?=\s*\()/)
        ],
        beginScope: { 1: 'built_in', 3: 'title.function.invoke' }
      },
      {
        begin: [APEX_IDENT_RE, /\./, regex.concat(APEX_IDENT_RE, /(?=\s*\()/)],
        beginScope: { 1: 'class.title', 3: 'title.function.invoke' }
      }
    ],
    contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      hljs.APOS_STRING_MODE,
      PARAMS,
      INSTANTIATE,
      'self'
    ],
    relevance: 0,
    illegal: [].concat(...MAIN_KEYWORD_LIST)
  };

  // * TRIGGER DECLARATION

  const TRIGGER_NAMESPACE_CALLS = {
    match: [
      /\bTrigger/,
      /\./,
      /(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size|operationType)\b/
    ],
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
    //begin: [/\bclass\b/, /\s+/, APEX_IDENT_RE],
    //beginScope: { 1: 'keyword', 3: 'title.class' },

    begin: /\bclass\b/,
    beginScope: 'keyword',
    end: /\{/,
    endScope: 'punctuation',
    //returnEnd: true,
    scope: 'class_declaration',
    keywords: { type: TYPES, keyword: MAIN_KEYWORD_LIST },
    contains: [
      NAMESPACES,
      {
        match: [/(?<=\bclass\b)\s+/, APEX_IDENT_RE],
        scope: { 2: 'title.class' }
      },
      {
        returnEnd: true,
        endsWithParent: true,
        variants: [
          {
            //begin: /\b(implements)\b/,
            //beginScope: 'keyword',
            beginKeywords: 'implements',
            end: /(\b(extends)\b)|\{/,
            scope: 'implements block'
          },
          {
            //begin: /\b(extends)\b/,
            //beginScope: 'keyword',
            beginKeywords: 'extends',
            end: /(\b(implements)\b)|\{/,
            scope: 'extends block'
          }
        ],
        contains: [
          NAMESPACES,
          {
            match: /\<|\>/,
            scope: 'punctuation'
          },
          {
            match: regex.concat(
              /\b/,
              regex.either(...NAMESPACE_LIST),
              /\b\s*(?!<>)/
            ),
            scope: 'built_in'
          },
          {
            match: [/\b/, APEX_IDENT_RE, /\./, APEX_IDENT_RE, /(?=[,\s<])/],
            scope: { 2: 'built_in', 4: 'title.class.inherited' }
          },
          {
            // collection type
            match: [/\b/, APEX_IDENT_RE, /(?=>)/],
            scope: {
              2: 'type' //, 3: 'punctuation'
            }
          },
          {
            //(?!implements|extends)\s+
            match: regex.concat(/\b/, APEX_IDENT_RE, /\b(?!<)/),
            scope: 'title.class.inherited'
          },
          {
            match: regex.concat(/\b/, regex.either(...BUILT_INS), /\b\s*(?!>)/),
            scope: 'title.class.inherited'
          }
        ]
      }
    ]
  };

  const ENUM_DECLARATION = {
    begin: [/\benum\s+/, APEX_IDENT_RE, /\s*/, /\{/],
    beginScope: {
      1: 'type',
      2: 'type'
    },
    end: /[\}\n]/,
    returnEnd: true,
    scope: 'enum_declaration',
    relevance: 0,
    contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      PUNCTUATION_RE,
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

  // commented for now - too easy to overlap with method_call
  const CONSTRUCTOR_DECLARATION = [
    {
      // Constructor
      // Matches public/privat/protectede, methodname, then parens and a curly bracket

      begin: [/(public|private|protected)\s+/, APEX_IDENT_RE, /(?=\s*\()/], // /(?=\s*\()/],
      beginScope: {
        1: 'keyword',
        2: 'constructor'
      },
      end: /\{/,
      //returnEnd: true,
      contains: [PARAMS, PUNCTUATION_RE]
    }
  ];

  const DECLARATIONS = [].concat(
    TRIGGER_DECLARATION,
    CLASS_SHARING,
    TRIGGER_NAMESPACE_CALLS,
    ENUM_DECLARATION,
    CONSTRUCTOR_DECLARATION,
    CLASS_DECLARATION
  );

  const RETURNS = [
    {
      match: [/\breturn\b\s+/, regex.either(LITERALS)],
      scope: {
        2: 'literal'
      }
    },
    {
      match: [/\breturn\s+(?!(true|false|null))/, APEX_IDENT_RE, ';'],
      scope: {
        2: 'variable'
      }
    },
    {
      match: [/\breturn\b/, /\s+/, regex.lookahead(APEX_IDENT_RE + /\(/)],
      //returnBegin: true,
      //end: /(?=\))/,
      scope: {
        2: 'title.function.invoke'
      }
      //contains: [METHOD_CALL, PARAMS]
    }
    // * RETURN NEW OBJECT - NO PARAMS BY DEFAULT
  ];

  const SALESFORCE_ID = {
    match: /(?<!\.)\bId\b(?=[\s>])/,
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
    beginScope: { 1: 'punctuation', 3: 'keyword soql' },
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
        scope: 'from_clause',
        end: /(?=\]|\s)/,
        //endScope: 'punctuation',
        contains: [
          {
            match: [/(?<=\.)/, APEX_IDENT_RE, /\b/],
            scope: { 2: 'type' }
          },
          PUNCTUATION_RE
        ]
      },
      {
        match: /\]/,
        scope: 'punctuation',
        endsParent: true
      },
      {
        match: /\b\s*IN|=\s*:/,
        scope: 'operator'
      },
      {
        begin: regex.concat(/\b/, regex.either(...SOQL_KEYWORDS), /\b/),
        scope: 'keyword soql',
        relevance: 0
      },
      {
        match: regex.concat(/\b/, regex.either(...SOQL_OPERATORS), /\b/),
        scope: 'operator soql',
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
      OPERATOR_RE,
      PUNCTUATION_RE,
      hljs.APOS_STRING_MODE
    ],
    illegal: '::'
  };

  const FOR_LOOP = {
    begin: [/\bfor\b\s*/, /\(/, APEX_IDENT_RE, /\s+/, APEX_IDENT_RE, /\s*:/],
    beginScope: {
      //1: 'keyword',
      //2: 'punctuation',
      3: 'type',
      5: 'variable for',
      6: 'operator'
    },
    scope: 'for_loop',
    end: [/\)\s*\{/],
    endScope: { 1: 'punctuation' },
    //returnEnd: true,
    //endScope: 'punctuation',

    contains: [
      COMMENT_LINE,
      COMMENT_BLOCK,
      SOQL_QUERY,
      METHOD_CALL,
      {
        match: regex.concat(APEX_IDENT_RE, /\b(?!\()/),
        scope: 'variable'
      }
    ],
    METHOD_CALL,
    PUNCTUATION_RE,
    OPERATOR_RE
  };

  // TODO: Do DMLs
  const DML_OPERATIONS = [
    /*
     * DML types
     * naked - insert a;
     *
     */
    {
      begin: regex.concat(/\s\b/, regex.either(...DMLS), /\b\s/),
      //returnBegin: true,
      beginScope: 'built_in',
      end: /;|$/,
      //endScope: 'punctuation',
      scope: 'dml',
      contains: [
        INSTANTIATE,
        {
          match: /\bas\s+(user|system)\b/,
          scope: 'keyword'
        },
        {
          match: [APEX_IDENT_RE, /\s*;/],
          scope: { 1: 'variable' }
        },
        PUNCTUATION_RE,
        COMMENT_LINE,
        SOQL_QUERY
      ]
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
        APEX_IDENT_RE,
        /\s*/,
        regex.lookahead(/\(/)
      ],
      beginScope: { 1: 'built_in', 3: 'built_in' },
      end: ';',
      //endScope: 'punctuation',
      scope: 'database_dml',
      contains: [
        PARAMS,
        LITERAL_RE,
        hljs.APOS_STRING_MODE,
        COMMENT_BLOCK,
        COMMENT_LINE,
        {
          match: [/\(/, APEX_IDENT_RE, /,/],
          scope: { 2: 'variable' }
        },
        {
          // TODO: Pick better scopes here
          match: ['AccessLevel', /\./, /(SYSTEM_MODE|USER_MODE)/],
          scope: {
            1: 'built_in',
            3: 'keyword'
          }
        }
        /* {
        start: /\(/,
        end: /\)/,
        scope: 'dml params',
        endsWithParent: true,
        contains: [PARAMS, LITERAL_RE, hljs.APOS_STRING_MODE, COMMENT_BLOCK, COMMENT_LINE  ]
      } */
      ]
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
    keywords: {
      $pattern: APEX_IDENT_RE,
      keyword: MAIN_KEYWORD_LIST.concat(...STORAGE_MODIFIER_LIST),
      'variable.language': LANGUAGE_VAR_LIST,
      built_in: BUILT_INS,
      type: TYPES,
      literal: LITERALS
    },
    illegal: ILLEGALS,
    contains: [
      ANNOTATIONS,
      ASSIGNMENTS,
      COLLECTION_DECLARATION,
      COMMENT_BLOCK,
      COMMENT_LINE,
      //CUSTOM_METADATA,
      DECLARATIONS,
      DML_OPERATIONS,
      EXCEPTION,
      FOR_LOOP,
      hljs.APOS_STRING_MODE,
      INSTANTIATE,
      METHOD_CALL,
      NAMESPACES,
      NUMBERS,
      OPERATOR_RE,
      PUNCTUATION_RE,
      RETURNS,
      SALESFORCE_ID,
      SOQL_QUERY,
      SWITCH_STATEMENT
    ]
  };
}
