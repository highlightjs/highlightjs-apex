
function (hljs) {}


export const APEX_IDENT_RE = '[a-zA-Z][a-zA-Z_0-9]*';
export const APEX_IDENT_WORD_RE = '\\b' + APEX_IDENT_RE + '\\b';

export const KEYWORD_LIST = [
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

/* export const KEYWORD_RE = [
  /try\b/,
  /catch\b/,
  /finally\b/,
  /get\b/,
  /set\b/,
  /put\b/,
  /if\b/,
  /for\b/,
  /else\b/,
  /do\b/,
  /while\b/,
  /continue\b/,
  /break\b/,
  /implements\b/,
  /extends\b/,
  /return\b/,
  /throw\b/,
  /when\b/,
  /new\b/
]; */

export const LANGUAGE_VAR_LIST = ['instanceof', 'super', 'this'];

export const LITERALS = ['false', 'true', 'null'];

export const STORAGE_MODIFIER_LIST = [
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

export const TYPES = [
  'anytype',
  'blob',
  'boolean',
  'byte',
  'currency',
  'date',
  'datetime',
  'decimal',
  'double',
  'enum',
  'float',
  'integer',
  'long',
  'object',
  'pagereference',
  'selectoption',
  'short',
  'sobject',
  'string',
  'time',
  'void',
  'float'
  /*     'map',
  'list',
  'set' */
];

export const DMLS = [
  'insert',
  'update',
  'upsert',
  'delete',
  'undelete',
  'merge',
  'convertLead'
];

export const SYSTEM_INTERFACES = [
  'schedulable',
  'batchable',
  'queueable',
  'comparable',
  'callable'
];

export const NAMESPACE_LIST = [
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
export const SYSTEM_CLASSES = [
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
export const SYSTEM_ENUMS = [
  'AccessType',
  'AccessLevel',
  'DomainType',
  'JSONToken',
  'LoggingLevel',
  'Quiddity',
  'TriggerOperation',
  'operationType'
];

export const BUILT_INS = NAMESPACE_LIST.concat(...SYSTEM_CLASSES);

const KEYWORDS = {
  $pattern: '(?<!\\.)' + APEX_IDENT_WORD_RE,
  keyword: KEYWORD_LIST.concat(...STORAGE_MODIFIER_LIST).concat(...DMLS),
  'variable.language': LANGUAGE_VAR_LIST,
  built_in: BUILT_INS,
  type: TYPES,
  literal: LITERALS
};

export const PUNCTUATION_LIST = [
  ',',
  /(?<!=\?)(\.)/,
  ';',
  /(?<=\w)(\>)/,
  /(\<)(?=\w)/,
  /\{|\}/,
  /\(|\)/,
  /\{|\}/
];

export const OPERATORS_RE = [
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
  /\?\./, // null-safe operator
  /(?<!\?)\?(?!\?|\.|\[)/, // ternary operator or CONDITIONAL_OPERATOR
  /%[^%]|\*[^\/]|\/[^\/\*]|(?<!\-)\-(?!\-)|(?<!\+)\+(?!\+)/, // arithmetic
  /(?<!\=|!)\=(?!\=|>)/ // assignment
];

export const NUMBERS_RE = [
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
];

export const SALESFORCE_ID = {
  match: /(?<!\.)\bId\b/,
  scope: 'type',
  relevance: 8
};

export const SWITCH_STATEMENT = {
  match: [/\bswitch\s+on\s+/, APEX_IDENT_RE],
  scope: { 1: 'keyword', 2: 'variable' }
};

export const EXCEPTION = {
  // Various Apex Exception types
  match: [/\b[a-zA-Z0-9\.]*Exception/, /\s+/, APEX_IDENT_RE],
  scope: { 1: 'title.class', 3: 'variable' },
  relevance: 0
};

export const CLASS_SHARING = {
  // class sharing
  relevance: 5,
  match: /\b(with|without|inherited)\s+sharing\b/,
  scope: 'keyword'
};

export const INSTANTIATE_TYPE = {
  // Account a = new Account(Name = 'test account);
  match: [/\bnew\s+/, APEX_IDENT_RE, /(?=\s*\()/],
  scope: { 2: 'type' },
  relevance: 0
};

/**
 * SOQL SECTION
 */

export const SOQL_RESERVED = [
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

export const SOQL_OPERATORS = [
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

export const SOQL_FUNCTIONS = [
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

export const SOQL_DATE_FUNCTIONS = [
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

export const ILLEGALS = [
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
  /^default/, // lsl
  /\/ ;$/, // gams
  /\/\n/ // gams
];

// * Can use later; omitted for now
/*   export const CUSTOM_METADATA = {
    // Custom fields, apex.types, etc.
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
