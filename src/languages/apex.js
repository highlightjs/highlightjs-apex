/*
Language: Apex
Author: David Schach <dschach@x2od.com>
Category: Salesforce, Force.com, Salesforce Platform, Einstein 1 Platform
Website: https://developer.salesforce.com/
*/

/** @type LanguageFn */
export default function (hljs) {
  const regex = hljs.regex;
  function wholeWord(re) {
    return regex.concat(/\b/, re, /\b/);
  }

  const APEX_IDENT_RE = '[a-zA-Z][a-zA-Z_0-9]*';
  const APEX_IDENT_WORD_RE = '\\b' + APEX_IDENT_RE + '\\b';
  const WORD_PAREN = APEX_IDENT_RE + '(?=\\s*\\()';
  const ANNOTATION_RE = '@' + APEX_IDENT_RE;
  const PARENS_LOOKAHEAD = /(?=\s*\()/;

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
    scope: 'variable.language'
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
    'float|0',
    'id'
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
    'TriggerOperation'
  ];

  const BUILT_INS = []
  .concat(...NAMESPACE_LIST)
  .concat(...DMLS)
  .concat(...SYSTEM_CLASSES);

const LITERALS = ['false', 'true', 'null'];

  const KEYWORDS= {
    $pattern: regex.concat(/(?<!\.)/, APEX_IDENT_WORD_RE),
    keyword: MAIN_KEYWORD_LIST.concat(...STORAGE_MODIFIER_LIST),
    'variable.language': LANGUAGE_VAR_LIST,
    built_in: BUILT_INS,
    type: TYPES,
    literal: LITERALS
  };


  const LITERAL_RE = {
    match: regex.concat(/abc123\b/, regex.either(...LITERALS), /\s*(?=[,\)])/),
    scope: 'literal',
    relevance: 0
  };

  const COMMENT_LINE = hljs.COMMENT('//', /[$\n]/, {
    relevance: 0
  });

  // Nice to have worked on this, but not necessary
  /* const MARKDOWN_URL = [
    {
      begin: /\[/,
      end: '\\]\\(',
      excludeBegin: true,
      returnEnd: true,
      scope: 'symbol'
    },
    {
      begin: '\\]\\(',
      end: '\\)',
      excludeBegin: true,
      excludeEnd: true,
      scope: 'link'
    },
  ]; */
  const COMMENT_BLOCK = hljs.COMMENT('/\\*', '\\*/', {
    relevance: 0,
    contains: [ 
      //MARKDOWN_URL,
      
      {
        // eat up @'s in emails to prevent them to be recognized as doctags
        begin: /\w+@/,
        relevance: 0
      },
      {
        match: [/@(?:exception|throws)/, /\s+/, APEX_IDENT_RE],
        scope: { 1: 'doctag', 3: 'title.class' }
      },
      {
        begin: /@[A-Za-z_]+/,
        end: /\s/,
        returnEnd: true,
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
        match: regex.concat(/(?<=@param\s+)/, APEX_IDENT_RE),
        scope: 'variable'
      }
    ]
  });

  const SWITCH_STATEMENT = {
    match: [/\bswitch\s+on\s+/, APEX_IDENT_RE],
    scope: { 1: 'keyword', 2: 'variable' }
  };

  const OPERATOR_LIST = [
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
  const ANY_OPERATOR_RE = regex.either(...OPERATOR_LIST);
  const OPERATOR_RE = {
    match: regex.concat(
      '(?<!',
      ANY_OPERATOR_RE,
      ')',
      ANY_OPERATOR_RE,
      '(?!',
      ANY_OPERATOR_RE,
      ')'
    ),
    scope: 'operator',
    relevance: 0
  };

  const ANNOTATIONS = [
    // We allow any annotation, so we do not need to maintain this as often
    {
      // Type 1: one annotation
      // @isTest
      match: regex.concat(ANNOTATION_RE, /\b(?!\s*\()/), //, /(?=(\(|\b|\s))/]
      scope: 'meta'
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
      returnEnd: true,
      scope: 'annotation',
      contains: [
        {
          match: [APEX_IDENT_WORD_RE, /(?=\s*=)/],
          scope: {
            1: 'meta keyword'
          },
          contains: [OPERATOR_RE]
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
      match: [/\b[a-zA-Z0-9\.]*Exception/, /\s+/, APEX_IDENT_RE],
      scope: { 1: 'title.class', 3: 'variable' },
      relevance: 0
    }
  ];

  const COLLECTION_REGEX = [
    // TODO: make a matcher for each type (map, list, set) with all the ways to initialize
    // * List<Type>
    // * Type[] <- array notation
    // * Set<Type>
    // * Map<Type, Type>() <- allow for parens and for SOQL
    // * Map<Id, CustomObject__c> myMap = new Map<Id, CustomObject__c>(SOQL_QUERY);
    // * Map<Id, String> myMap = new Map<Id, String>{a => b, c => d} last bit contains string, etc.
    {
      scope: 'collection',
      begin: /\b(list|set|map)(?=\s*<)/,
      beginScope: 'type',
      //end: />+/,
      end: /\>+/,
      contains: [
        {
          match: regex.concat(/\b/, APEX_IDENT_RE, /\b/),
          scope: 'type'
        }
      ],
      relevance: 10
    },
    // array creation (exclude SOQL, contains strings, etc
    {
      begin: [APEX_IDENT_WORD_RE, /\[(?!\d\])/],
      beginScope: { 1: 'type' },
      end: /\]/,
      scope: 'array',
      contains: [NUMBERS, hljs.APOS_STRING_MODE, COMMENT_LINE]
    },
    // array reference (only has integer in array)
    {
      match: [APEX_IDENT_WORD_RE, /\[/, /\d+/, /\]/],
      scope: { 1: 'variable', 3: 'number' }
    },
    {
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
      end: /(?=\(|;)/,
      //scope: 'instantiate',
      contains: [
        { match: WORD_PAREN, scope: 'title.class'    },
        COMMENT_LINE,
        OPERATOR_RE,
        COLLECTION_REGEX
      ],
      illegal: ':',
      relevance: 0
    },
    {
      // Account abcd;
      match: [
        /(^|\s+)/,
        regex.concat(/(?!return)\b/, APEX_IDENT_RE),
        /\s+/,
        regex.concat(/(?!get|set)/, APEX_IDENT_RE),
        /\s*;/
      ],
      scope: {
        2: 'type',
        4: 'variable'
      }
    }
  ];

  const TRIGGER_NAMESPACE_CALLS = {
    match: [
      /\bTrigger/,
      /\./,
      /(isExecuting|isInsert|isUpdate|isDelete|isBefore|isAfter|isUndelete|new|newMap|old|oldMap|size|operationType)\b/
    ],
    scope: { 1: 'built_in', 3: 'keyword' },
    relevance: 10
  };

  const NAMESPACES = [
    {
      match: [
        regex.concat(/\b/, regex.either(...SYSTEM_ENUMS)),
        /\./,
        APEX_IDENT_RE,
        /(?![\.\(])/
      ],
      scope: { 1: 'built_in', 3: 'variable.constant' }, // TODO: Find a better scope for the enum value
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
      scope: { 2: 'built_in', 4: 'keyword' }
    },
    {
      match: regex.concat(
        regex.either(...NAMESPACE_LIST),
        regex.lookahead(/\./)
      ),
      scope: 'built_in'
    }
  ];

  const PARAMS = {
    scope: 'params',
    begin: /\((?!\s*\[)/,
    end: /\)/,
    excludeBegin: true,
    excludeEnd: true,
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
      OPERATOR_RE,
      COLLECTION_REGEX,
      TRIGGER_NAMESPACE_CALLS,
      NAMESPACES,
      NUMBERS,
      INSTANTIATE,
      //SOQL_QUERY,
      'self',
      {
        // mymethod(Date myDate, Date yourDate); highlights each part of each parameter
        // must be followed by comma or paren
        match: regex.concat(/(?<=[\s\(])/,
          APEX_IDENT_WORD_RE,
          regex.lookahead(regex.concat(/\s+/, APEX_IDENT_RE, /\s*[,)]/))
        ),
        scope: 'type'
      },
      /* {
        // Second part of the parameter, followed by comma or paren
        match: regex.concat(/(?<!\.)\b/, APEX_IDENT_RE, /(?=\s*[,)])/),
        scope: 'variable'
      }, */
      
    ]
  };

  // * Commented at this time; will revisit
  /* const ASSIGNMENTS = {
    //scope: 'assignment',
    relevance: 0,
    contains: [OPERATOR_RE],
    variants: [
      {
        // Account a =
        match: [
          regex.concat(/(?!return)\b/, APEX_IDENT_RE),
          /\s+/,
          APEX_IDENT_RE,
          /(?=\s*\=)/
        ],
        scope: {
          1: 'title.class',
          3: 'variable'
        }
      },

      {
        // mynum =
        // could also be a collection variable
        match: [/(?<!\.)\b/, APEX_IDENT_RE, /\s*(?=\=)/],
        scope: { 2: 'variable' }
      },
      // Casting
      {
        match: [
          /(?<==\s*)/,
          /\(/,
          APEX_IDENT_RE,
          /\)/,
          '(?=\\s*' + APEX_IDENT_RE + ')'
        ],
        scope: {
          3: 'title.class'
        }
      }
    ]
  }; */
  // * Can use later; omitted for now
  /* const CUSTOM_METADATA = {
    // Custom fields, types, etc.
    match: [
      /(?<!(\w|[^\.]))/,
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

  const INVOKE = [
    {
      match: regex.concat(/\b/, regex.either(...BUILT_INS), /(?=\.)/),
      scope: 'built_in'
    },
    {
      match: regex.concat(/(?<=\.)\b/, APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD),
      scope: 'title.function.invoke',
      starts: { contains: [PARAMS] },
      relevance: 0
    },
  ];

  const CLASS_CALL = [
    
    /* {
      // Non-system class invocation
      match: 
        regex.concat('(?!', regex.either(...BUILT_INS), ')', APEX_IDENT_RE, /(?=\.)/),
        
     scope: 'title.class' 
    }, */
  ];

  const METHOD_CALL = [
    // * TODO: Do we need more ways to identify functions?
    /* {
      match: regex.concat(/(?<!\.)\b/, APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD),
      scope: 'title.function'
    }, */
    
    /* {
      // Non-system method invocation with a class
      match: [
        regex.concat('(?!', regex.either(...BUILT_INS), ')', APEX_IDENT_RE),
        /\./,
        regex.concat(APEX_IDENT_RE, PARENS_LOOKAHEAD)
      ],
      scope: { 1: 'title.class', 3: 'title.function.invoke' },
      starts: { contains: [PARAMS] },
      relevance: 0
    }, */
    /* {
      // Non-system method invocation with a class
      match: [
        regex.either(...BUILT_INS),
        /\./,
        regex.concat(APEX_IDENT_RE, PARENS_LOOKAHEAD)
      ],
      scope: { 1: 'built_in', 3: 'title.function.invoke' },
      starts: { contains: [PARAMS] },
      relevance: 0
    } */
  ].concat(...INVOKE);

  // * METHOD DECLARATION

  const METHOD_NAME = [
    {
      // method declaration
      match: [/(?<=(\<|\>|\w|_))\s+/, APEX_IDENT_RE, PARENS_LOOKAHEAD],
      scope: { 2: 'title.function' },
      starts: { contains: [PARAMS] },
      relevance: 0
    }
  ];

  // * TRIGGER DECLARATION

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
      7: 'title.class'
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
            match: /\b(before|after)\s+(insert|update|delete|merge|undelete)\b/,
            scope: 'built_in'
          }
        ]
      }
    ]
  };

  const EXTEND_IMPLEMENT = {
    
  }

  // * CLASS DECLARATION

  const CLASS_DECLARATION = {
    begin: [/[^\.]/, /\bclass\b/],
    beginScope: { 2: 'keyword' },
    end: /(?=\{)/,
    //scope: 'class_declaration',
    keywords: { type: TYPES, keyword: MAIN_KEYWORD_LIST },
    contains: [
      NAMESPACES,
      {
        match: [/(?<=\bclass)\s+/, APEX_IDENT_RE],
        scope: { 2: 'title.class' }
      },
      {
        returnEnd: true,
        endsWithParent: true,
        variants: [
          {
            beginKeywords: 'implements',
            end: /(\b(extends)\b)|\{/
            //scope: 'implements block'
          },
          {
            beginKeywords: 'extends',
            end: /(\b(implements)\b)|\{/
            //scope: 'extends block'
          }
        ],
        contains: [
          NAMESPACES,
          {
            match: [/\b/, APEX_IDENT_RE, /\./, APEX_IDENT_RE, /(?=[,\s<])/],
            scope: { 2: 'built_in', 4: 'title.class.inherited' }
          },
          {
            // collection type
            match: [/\b/, APEX_IDENT_RE, /(?=>)/],
            scope: {
              2: 'type'
            }
          },
          {
            match: regex.concat(/\b/, APEX_IDENT_RE, /\b(?!<)/),
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
    //scope: 'enum_declaration',
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

  const CONSTRUCTOR_DECLARATION = [
    {
      // Constructor
      // Matches public/privat/protectede, methodname, then parens and a curly bracket
      match: [/(public|private|protected)\s+/, APEX_IDENT_RE, PARENS_LOOKAHEAD],
      scope: {
        1: 'keyword',
        2: 'constructor'
      },
      starts: { contains: [PARAMS] }
    }
  ];

  const DECLARATIONS = [].concat(
    TRIGGER_DECLARATION,
    CLASS_SHARING,
    TRIGGER_NAMESPACE_CALLS,
    ENUM_DECLARATION,
    CONSTRUCTOR_DECLARATION,
    CLASS_DECLARATION,
    METHOD_NAME
  );

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
    'WHEN',
    /* /USING\s+SCOPE\s*(Delegated|Everything|Mine|My_Territory|My_Team_Territory|Team)/, */
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
    'FOR',
    'REFERENCE',
    'UPDATE',
    'VIEW',
    'GROUP',
    'BY',
    'NULLS',
    'FIRST',
    'LAST',
    'ORDER',
    'WITH',
    'DATA',
    'CATEGORY',
    'PricebookId',
    /* /FOR\s+REFERENCE/,
    /FOR\s+UPDATE/,
    /FOR\s+VIEW/,
    /GROUP\s+BY/,
    /NOT\s+IN/,
    /NULLS\s+(FIRST|LAST)/,
    /ORDER\s+BY/,
    /WITH/,
    /DATA\s+CATEGORY/,
    /WITH\s+PricebookId/ */
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
    begin: [/\[/, /\s*/, /(SELECT|FIND)\b/],
    beginScope: { 3: 'keyword' },
    end: /\]/,
    scope: 'soql',
    relevance: 10,
    endsWithParent: true,
    keywords: {
      keyword: [].concat(...SOQL_KEYWORDS).concat(...KEYWORDS.keyword),
      operator: SOQL_OPERATORS,
      'title.function.invoke': SOQL_FUNCTIONS,
      literal: [].concat(...SOQL_DATES).concat(...KEYWORDS.literal),
      built_in: BUILT_INS
    },
    contains: [
      {
        begin: [/\bFROM/, /\s+/, APEX_IDENT_WORD_RE],
        beginScope: {
          1: 'keyword',
          3: 'type'
        },
        //scope: 'from_clause',
        end: /(?=\]|\s)/,
        contains: [
          {
            match: [/(?<=\.)/, APEX_IDENT_WORD_RE],
            scope: { 2: 'type' }
          }
        ]
      },
      {
        match: /\bIN|=\s*:/,
        scope: 'operator'
      },
      /* {
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
      }, */
      
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
      hljs.APOS_STRING_MODE,
      
    ],
    illegal: '::'
  };

  const FOR_LOOP = {
    begin: [
      /\bfor\b\s*/,
      /\(/,
      APEX_IDENT_RE,
      /\s+/,
      APEX_IDENT_RE,
      /\s*/,
      /:/
    ],
    beginScope: {
      3: 'type',
      5: 'variable',
      7: 'operator'
    },
    end: /\{/,
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
        match: regex.concat(APEX_IDENT_WORD_RE, PARENS_LOOKAHEAD),
        scope: 'title.function.invoke'
      },
      {
        match: /\{/,
        endsParent: true
      },
      OPERATOR_RE,
      NUMBERS
    ]
  };

  const DML_OPERATIONS = [
    /*
     * DML types
     * naked - insert a;
     *
     */
    {
      begin: regex.concat(/\b/, regex.either(...DMLS), /\s+(?!\()/),
      beginScope: 'built_in',
      end: /;|$/,
      //scope: 'dml',
      contains: [
        INSTANTIATE,
        {
          match: /\bas\s+(user|system)\b/,
          scope: 'keyword'
        },
        {
          match: [APEX_IDENT_RE, /(?=\s*;)/],
          scope: { 1: 'variable' }
        },
        COMMENT_LINE,
        SOQL_QUERY,
        NUMBERS,
        OPERATOR_RE
      ]
    },
    /*
     * DML types
     * Database - Database.insert( );
     *
     */
    {
      begin: [/\bDatabase\b/, /\./, APEX_IDENT_RE, regex.lookahead(/\s*\(/)],
      beginScope: { 1: 'built_in', 3: 'title.function.invoke' },
      end: ';',
      //scope: 'database_dml',
      contains: [
        PARAMS,
        LITERAL_RE,
        hljs.APOS_STRING_MODE,
        COMMENT_BLOCK,
        COMMENT_LINE
        // {match: [/(?<=\()/, APEX_IDENT_RE, /(?=,)/],scope: { 2: 'variable' } }
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
      /* $pattern: regex.concat(/(?<!\.)/, APEX_IDENT_WORD_RE),
      keyword: MAIN_KEYWORD_LIST.concat(...STORAGE_MODIFIER_LIST),
      built_in: BUILT_INS,
      type: TYPES,
      literal: LITERALS */
      KEYWORDS
    },
    illegal: ILLEGALS,
    contains: [
      ANNOTATIONS,
      COLLECTION_REGEX,
      COMMENT_BLOCK,
      COMMENT_LINE,
      DECLARATIONS,
      DML_OPERATIONS,
      EXCEPTION,
      FOR_LOOP,
      hljs.APOS_STRING_MODE,
      INSTANTIATE,
      LANGUAGE_VARS_RE,
      METHOD_CALL,
      NAMESPACES,
      NUMBERS,
      OPERATOR_RE,
      //PARAMS,
      SOQL_QUERY,
      SWITCH_STATEMENT
    ]
  };
}
