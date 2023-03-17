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
  const APEX_FULL_TYPE_RE = '[a-zA-Z][a-zA-Z_0-9.<>]*';

  const NUMBER = {
    scope: 'number',
    variants: [
      {
        match: /\b[0-9]+(?:\.[0-9]+)?/
      },
      {
        match: /\s(?:[0-9,]+)?\.[0-9]+/
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
    /as\s+user/,
    /as\s+system/,
    'newMap|10',
    'old|10',
    'oldMap|10',
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

  const BUILT_INS = [
    'insert',
    'update',
    'upsert|8',
    'delete',
    'undelete',
    'merge',
    'finish',
    'start',
    'execute',
    'schedulable|10',
    'batchable|10',
    'queueable|10',
    'comparable|10',
    'callable|10'
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

  const KEYWORDS = {
    $pattern: '[A-Za-z][0-9A-Za-z$_]*',
    keyword: MAIN_KEYWORDS,
    'variable.language': LANGUAGE_VARS,
    built_in: BUILT_INS,
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
    'UserProvisioning|10',
    'VisualEditor|10',
    'Wave|10'
  ];

  const OPERATOR_REGEX = [
    /-/,
    /--/,
    /~/,
    /\*/,
    /\*=/,
    /\/=/,
    /%/,
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

  const NAMESPACES = {
    match: [/\b/, regex.either(...NAMESPACE_LIST), /(?=\.)/],
    scope: { 2: 'built_in' },
    relevance: 10
  };

  const CLASS_SHARING = {
    relevance: 10,
    match: [/\b(?:with|without|inherited)\s+sharing/],
    scope: {
      1: 'keyword'
    }
  };

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

  const ANNOTATIONS = {
    relevance: 10,
    scope: { 1: 'meta' },
    // We will allow any annotation, so we do not need to maintain this as often
    //match: [regex.either(...APEX_ANNOTATIONS), /(?=(\(|\b|\s))/],
    match: ['@' + APEX_IDENT_RE, /(?=(\(|\b|\s))/]
  };

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

  const COLLECTION_MAP_VALUE = [
    {
      match: [regex.concat(/\b/, APEX_IDENT_RE, /\b/), />/],
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

  const CUSTOM_OBJECT = {
    // Custom fields, types, etc.
    match: [/[^\.]/, /\b[a-zA-Z][a-zA-Z\d_]*__[cxeb]\b/, /[\(\s;,]+/],
    scope: {
      2: 'type'
    },
    relevance: 10
  };

  const METHOD_CALL = {
    variants: [
      {
        begin: [/\./, regex.concat('(?:' + APEX_IDENT_RE + ')'), /(?=\s*\(\))/],
        scope: { 2: 'title.function.invoke' }
      },
      {
        begin: [
          /\./,
          regex.concat('(?:' + APEX_IDENT_RE + ')'),
          /(?=\s*\([^\)])/
        ],
        scope: { 2: 'title.function.invoke' }
      },
      {
        begin: [
          /(?<=\s)/,
          regex.concat('(?:' + APEX_IDENT_RE + ')'),
          /(?=\s*\()/
        ],
        scope: { 2: 'title.function' }
      }
    ],
    contains: [COMMENT_LINE, COMMENT_BLOCK, hljs.APOS_STRING_MODE],
    relevance: 0
  };

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
    'FIND',
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
    begin: /\[[\s\n]*(?=SELECT)/,
    end: /\]/,
    scope: 'subst',
    relevance: 10,
    contains: [
      {
        begin: regex.concat(/\b/, regex.either(...SOQL_KEYWORDS), /\b/),
        scope: 'keyword'
      },
      {
        match: /(\bIN\b|<|<=|>|>=|\bNOT\s+IN\b|=|!\s*=|:{1})/,
        scope: 'literal',
        relevance: 0
      },
      {
        match: /(?<=\bFROM\b\s+)\w+/,
        scope: 'type',
        relevance: 0
      },

      {
        match: /\b[a-zA-Z][a-zA-Z_0-9]*\b/,
        scope: 'property'
      },
      NUMBER,
      METHOD_CALL
    ],
    illegal: '::'
  };

  const APEX_DECLARATIONS = [
    {
      match: [/\b(?<=enum|\bnew)/, /\s+/, APEX_IDENT_RE, /\s*(?=[{()])/],
      scope: {
        3: 'type' //title.class?
      },
      contains: [COMMENT_LINE, COMMENT_BLOCK, CUSTOM_OBJECT]
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
      match: [/(?<=public)/, /\s+/, APEX_IDENT_RE, /(?=\s*\()/],
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
        1: 'keyword',
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
      match: [/\bextends/, /\s+/, APEX_IDENT_RE],
      scope: {
        3: 'title.class.inherited'
      },
      contains: [COMMENT_LINE, COMMENT_BLOCK, NAMESPACES],
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
        match: [/\bfor\b/, /\s*\(/, /\w+/, /\s+/, /\w+/, /\s+:/, /(?=\s*\[)/],
        scope: {
          1: 'keyword',
          3: 'type'
          //5: 'variable'
        }
      },
      {
        match: [/\bfor\b/, /\s*\(/, /\w+/, /\s+/, /\w+/, /\s+:/, /\s*/, /\w+/],
        scope: {
          1: 'keyword',
          3: 'type'
          //5: 'variable',
          //8: 'variable'
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
    '"""',
    // /"[^"]+"/, // Quote_string_mode
    /@\w+\[\w+\]/ //moonscript
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
      CUSTOM_OBJECT,
      EXCEPTION,
      FOR_LOOP,
      hljs.APOS_STRING_MODE,
      METHOD_CALL,
      MERGE_FIELDS,
      NAMESPACES,
      NUMBER,
      OPERATORS,
      SALESFORCE_ID,
      SOQL_QUERY
    ]
  };
}
