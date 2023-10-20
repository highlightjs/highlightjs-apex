/*
Language: Apex
Author: David Schach <dschach@x2od.com>
Category: Salesforce, Force.com, Lightning Platform, Salesforce Platform
Website: https://developer.salesforce.com/
*/

/** @type LanguageFn */
export default function (hljs) {
	const regex = hljs.regex;
	//const APEX_ALPHA = '[a-zA-Z]';
	//const APEX_ALNUM = '[A-Za-z0-9]';
	//const APEX_ALPHA_UNDER = '[a-zA-Z_]';
	const APEX_IDENT_RE = regex.concat('[a-zA-Z]', '[A-Za-z0-9_]', '*'); // [a-zA-Z][A-Za-z0-9_]*
	const APEX_ACCESSOR_RE = regex.concat(/@?/, APEX_IDENT_RE);

	// * APEX KEYWORDS

	const APEX_KEYWORDS = [
		/throw/,
		/this/,
		/(get|set)/,
		/return/,
		'break',
		'continue',
		'if',
		'else',
		'throw',
		/switch\s+on/,
		/(do|while)/,
		/try/,
		/catch/,
		/finally/,
		/this/,
		/when/
	];

	// * KEYWORD REGEX TO FOLD INTO KEYWORDS

	const THROW_EXPRESSION = {
		match: /(?<!\.)\bthrow\b/,
		scope: 'keyword'
	};

	const THIS_EXPRESSION = {
		match: /\bthis\b/,
		scope: 'keyword'
	};

	const STORAGE_MODIFIERS = [
		'new',
		'public',
		'protected',
		'private',
		'abstract',
		'virtual',
		'override',
		'global',
		'static',
		'final',
		'transient',
		'testMethod'
	];

	// * ARRAY DECLARATIONS

	// * LITERALS

	const NUMERIC_LITERAL_LIST = [
		/\b(\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{1,3})?(\-|\+)\d{2}\:\d{2})\b/, //datetime
		/\b(\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{1,3})?(Z)?)\b/, //datetime
		/\b(\d{4}\-\d{2}\-\d{2})\b/, //date
		/\b0(x|X)[0-9a-fA-F_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //hex
		/\b0(b|B)[01_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/, //binary
		/\b([0-9_]+)?\.[0-9_]+((e|E)[0-9]+)?(F|f|D|d|M|m)?\b/, //decimal
		/\b[0-9_]+(e|E)[0-9_]+(F|f|D|d|M|m)?\b/, //decimal
		/\b[0-9_]+(F|f|D|d|M|m)\b/, //decimal
		/\b[0-9_]+(U|u|L|l|UL|Ul|uL|ul|LU|Lu|lU|lu)?\b/ //decimal
	];

	const NUMERIC_LITERAL = {
		match: regex.either(...NUMERIC_LITERAL_LIST),
		scope: 'number'
	};

	/* const STRING_CHARACTER_ESCAPE = {
		match: /\\/,
		scope: 'char.escape'
	}; */

	const STRING_LITERAL = hljs.APOS_STRING_MODE;

	const BOOLEAN_LITERAL = [/(?<!\.)\bfalse\b/, /(?<!\.)\btrue\b/, /(?<!\.)\bnull\b/];

	const LITERAL = [
		{
			match: regex.concat(/(?<!\.)\b/, regex.either(...BOOLEAN_LITERAL), /\b/),
			scope: 'literal'
		},
		NUMERIC_LITERAL,
		STRING_LITERAL
	];

	// * OPERATORS

	const OPERATOR_REGEX = [
		/--/,
		'%|*|/|-|+',
		/\!|&&|\|\|/,
		/\*=|\/=|%=|\+=|-=/,
		/\&=|\^=|<<=|>>=|\|=/,
		/\\&|~|\^|\|/,
		/\+\+/,
		/\=/,
		/<<|>>/,
		/<=|>=|<|>/,
		/==|!=/,
		/\?\./,
		/:/,
		/(?<!\?)\?(?!\?|\.|\[)/, // ternary operator or CONDITIONAL_OPERATOR
		/:/
	];

	const EXPRESSION_OPERATORS = {
		match: regex.either(...OPERATOR_REGEX),
		scope: 'operator'
	};

	const OPERATOR_SAFE_NAVIGATION = {
		match: /\?\./,
		scope: 'operator'
	};

	// ! THIS is not supported with lookbehinds on begin
	// TERNARY OPERATOR
	const CONDITIONAL_OPERATOR = {
		begin: /(?<!\?)\?(?!\?|\.|\[)/,
		beginScope: 'operator',
		end: ':',
		endScope: 'operator',
		contains: [EXPRESSION]
	};

	// * PUNCTUATION_DEFINITIONS
	const PUNCTUATION_ACCESSOR = {
		scope: 'punctuation',
		match: /(?<!\?)\./
	};

	const SAFE_NAVIGATOR_OR_ACCESSOR = [].concat(OPERATOR_SAFE_NAVIGATION, PUNCTUATION_ACCESSOR);

	const COLON_EXPRESSION = {
		match: ':',
		scope: 'operator'
	};

	const PUNCTUATION_COMMA = {
		scope: 'punctuation',
		match: ','
	};
	const PUNCTUATION_SEMICOLON = {
		match: ';',
		scope: 'punctuation'
	};

	const PUNCTUATION = [
		// punctuation accessor
		// punctuation comma
		// punctuation semicolon
		// parentheses
		// square brackets
		// curly brackets
		/</,
		/>/,
		/\(/,
		/\)/
	].concat(PUNCTUATION_SEMICOLON, PUNCTUATION_COMMA, PUNCTUATION_ACCESSOR);

	// * GENERIC APEX IDENTIFIER
	const IDENTIFIER = {
		match: APEX_IDENT_RE,
		scope: 'variable'
	};

	const TYPE_NULLABLE_SUFFIX = {
		match: /\?/,
		scope: 'punctuation'
	};

	// * CORE ITEMS

	// * TYPE DEFINITIONS
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
		'void|0'
	];

	const DML = ['insert', 'update', 'upsert|8', 'delete', 'undelete', 'merge'];

	const BUILT_INS = [].concat(DML, [
		'start',
		'execute',
		'finish',
		'schedulable|10',
		'batchable|10',
		'queueable|10',
		'comparable|10',
		'callable|10'
	]);

	const STORAGE_MODIFIER = {
		match: regex.concat(/(?<!\.)\b/, regex.either(...STORAGE_MODIFIERS), /\b/),
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
		'DataSource|10',
		'Dom',
		'EventBus|10',
		'Flow',
		'Functions',
		'KbManagement|10',
		'Label',
		'LxScheduler|10',
		'Messaging',
		'Metadata',
		'Pref_center|10',
		'Process',
		'QuickAction',
		'Reports',
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

	const COMMENT = {
		relevance: 0,
		scope: 'comment',
		variants: [
			{
				begin: /\/\*(\*)?/,
				beginScope: 'punctuation',
				end: '*/',
				endScope: 'punctuation'
			},
			{
				begin: /(^\s+)?(?=\/\/)/,
				end: '$',
				excludeEnd: true
			}
		],
		contains: [
			{
				begin: /(?<!\/)\/\/\/(?!\/)/,
				beginScope: 'punctuation',
				end: '$',
				excludeEnd: true,
				contains: {
					XML_DOC_COMMENT
				}
			},
			{
				begin: /(?<!\/)\/\/(?:(?!\/)|(?=\/\/))/,
				beginScope: 'punctuation',
				end: '$',
				excludeEnd: true
			},
			{
				// eat up @'s in emails to prevent them to be recognized as doctags
				begin: /\w+@/,
				relevance: 0
			}
		]
	};

	const JAVADOC_COMMENT = {
		scope: 'comment',
		begin: [/^\s*/, /\/\*\*(?!\/)/],
		beginScope: 'punctuation',
		end: /\*\//,
		endScope: 'punctuation',
		contains: [
			{
				scope: 'doctag',
				match: /@[A-Za-z_]+\b/
				// match: /@(deprecated|author|return|see|serial|since|version|usage|name|link)\b/
			},
			{
				match: ['@param', /\s+/, /\S+/],
				scope: { 1: 'doctag', 3: 'variable' }
			},
			{
				match: [/@(?:exception|throws)/, /\s+/, /\S+/],
				scope: { 1: 'doctag', 3: 'class.name' }
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
			hljs.APOS_STRING_MODE
		]
	};

	const BLOCK = {
		begin: '{',
		beginScope: 'punctuation',
		end: '}',
		endScope: 'punctuation',
		contains: [STATEMENT]
	};

	const SUPPORT_ADDITIONAL_TYPES = [
		/\w*Exception/,
		/\b(ApexPages|Database|PageReference|Savepoint|SchedulableContext|Schema|SObject|System|Test)\b/
	];

	const SUPPORT_CLASS = [
		{
			match: [/(?<!\.)\b/, regex.either(...NAMESPACE_LIST), /(?=\.)/],
			scope: { 2: 'built_in' }
		},
		{
			match: [/(?<!\.)\b/, regex.either(...SUPPORT_ADDITIONAL_TYPES), /(?=\.)/],
			scope: { 2: 'title.class' }
		}
	];

	const SUPPORT_FUNCTIONS = {
		match: regex.either(...BUILT_INS),
		scope: 'built-in'
	};

	const SUPPORT_NAME = [
		{
			match: [/\./, /\s*/, APEX_IDENT_RE, /(?=\()/],
			scope: { 1: 'punctuation', 3: 'title.function' }
		},
		{
			begin: '(',
			beginScope: 'punctuation',
			end: ')',
			endScope: 'punctuation',
			contains: [EXPRESSION, PUNCTUATION_COMMA]
		},
		{
			match: [/\./, /\s*/, APEX_IDENT_RE],
			scope: { 1: 'punctuation', 3: 'type' }
		}
	];

	const SUPPORT_TYPE = [COMMENT, SUPPORT_CLASS, SUPPORT_FUNCTIONS, SUPPORT_NAME];

	const SUPPORT_ARGUMENTS = {
		begin: '<',
		beginScope: 'punctuation',
		end: '>',
		endScope: 'punctuation',
		contains: [COMMENT, SUPPORT_TYPE, PUNCTUATION_COMMA]
	};

	// CANNOT USE lookbehind in begin
	const RETURN_STATEMENT = {
		begin: /(?<!\.)\breturn\b/,
		beginScope: 'keyword',
		end: /(?=;)/,
		contains: [EXPRESSION]
	};
	// CANNOT USE lookbehind in begin
	const ELSE_PART = {
		begin: /(?<!\.)\belse\b/,
		beginScope: 'keyword',
		end: /(?<=\})|(?=;)/,
		contains: [STATEMENT]
	};
	// CANNOT USE lookbehind in begin
	const FINALLY_CLAUSE = {
		begin: /(?<!\.)\bfinally\b/,
		beginScope: 'keyword',
		end: /(?<=\})/,
		contains: [COMMENT, BLOCK]
	};

	const BREAK_OR_CONTINUE_STATEMENT = {
		match: /(?<!\.)\b(?:(break)|(continue))\b/,
		scope: 'keyword'
	};

	const IF_STATEMENT = {
		match: /(?<!\.)\b(if)\b\s*(?=\()/,
		scope: 'keyword'
	};

	// * ADD SOQL QUERY?
	const FOR_STATEMENT = {
		// ! REDO THIS!
		begin: [
			/(?<!\.)\bfor\b/,
			/\s*\(\s*/,
			regex.either(regex.concat(...TYPE, ...SUPPORT_TYPE)),
			/\s+/,
			APEX_IDENT_RE,
			/\:/
		],
		beginScope: {
			1: 'keyword',
			//2: "punctuation"
			3: 'type',
			5: 'variable',
			6: 'operator'
		},
		end: /(?<=\})|(?=;)/,
		contains: [
			{
				begin: '(',
				end: ')',
				contains: [
					LOCAL_VARIABLE_DECLARATION,
					EXPRESSION,
					PUNCTUATION_COMMA,
					PUNCTUATION_SEMICOLON,
					COLON_EXPRESSION
				]
			},
			STATEMENT
		]
	};

	//const WHEN_STATEMENT =

	const STATEMENT = [
		BLOCK,
		BREAK_OR_CONTINUE_STATEMENT,
		COMMENT,
		DO_STATEMENT,
		ELSE_PART,
		EXPRESSION,
		FOR_STATEMENT,
		//GOTO_STATEMENT,
		//IF_STATEMENT,
		LOCAL_DECLARATION,
		PUNCTUATION_SEMICOLON,
		RETURN_STATEMENT,
		SOQL_QUERY_EXPRESSION,
		//SWITCH_STATEMENT,
		TRY_STATEMENT,
		WHEN_ELSE_STATEMENT,
		WHEN_MULTIPLE_STATEMENT,
		WHEN_SOBJECT_STATEMENT,
		WHEN_STATEMENT,
		WHILE_STATEMENT
	];

	const SUPPORT_EXPRESSION = {
		begin: regex.either(regex.concat(...NAMESPACE_LIST, ...SUPPORT_ADDITIONAL_TYPES)),
		beginScope: 'built_in',
		contains: [
			SUPPORT_TYPE,
			COMMENT,
			STATEMENT,
			{
				match: [/(?:(\.))/, regex.concat(APEX_IDENT_RE + '(?=()')],
				scope: { 1: 'punctuation', 2: 'title.function' }
			},
			{
				match: [/(?:(\.))/, regex.concat(APEX_IDENT_RE)],
				scope: { 1: 'punctuation', 2: 'type' }
			},
			{
				begin: '(',
				beginScope: 'punctuation',
				end: ')',
				endScope: 'punctuation',
				contains: [EXPRESSION, PUNCTUATION_COMMA]
			}
		]
	};

	const TYPE_ARGUMENTS = {
		begin: '<',
		beginScope: 'punctuation',
		end: '>',
		endScope: 'punctuation',
		excludeBegin: true,
		excludeEnd: true,
		contains: [COMMENT, SUPPORT_TYPE, TYPE, PUNCTUATION_COMMA]
	};

	const TYPE_ARRAY_SUFFIX = {
		begin: '[',
		beginScope: 'punctuation',
		end: ']',
		endScope: 'punctuation',
		contains: [PUNCTUATION_COMMA]
	};

	const TYPE_NAME = [
		{
			match: [APEX_ACCESSOR_RE, /\s*/, /\./],
			scope: { 1: 'type', 3: 'dot' }
		},
		{
			match: [/\./, /\s*/, APEX_IDENT_RE],
			scope: { 1: 'dot', 3: 'type' }
		},
		{
			match: APEX_ACCESSOR_RE,
			scope: 'type'
		}
	];

	const TYPE_BUILTIN = [
		{
			match: regex.concat(/\b/, regex.either(...TYPES), /\b/),
			scope: 'type'
		},
		{
			match: /(?<!\.)\bId\b/,
			scope: 'type',
			relevance: 8
		}
	];

	const TYPE = [COMMENT, TYPE_BUILTIN, TYPE_NAME, TYPE_ARGUMENTS, TYPE_ARRAY_SUFFIX]; // TYPE_NULLABLE_SUFFIX

	// * ENUM

	const ENUM_DECLARATION = {
		begin: /(?=\benum\b)/,
		end: /(?<=\})/,
		contains: [
			{
				begin: /(?=enum)/,
				end: /(?={)/,
				contains: [
					JAVADOC_COMMENT,
					COMMENT,
					{
						match: ['enum', /\s+/, APEX_IDENT_RE],
						scope: { 1: 'keyword', 3: 'type' }
					}
				]
			},
			{
				begin: '{',
				beginScope: 'punctuation',
				end: '}',
				endScope: 'punctuation',
				contains: [
					JAVADOC_COMMENT,
					COMMENT,
					PUNCTUATION_COMMA,
					{
						begin: APEX_ACCESSOR_RE,
						beginScope: 'variable.constant',
						end: /(?=,|\})/,
						contains: [JAVADOC_COMMENT, COMMENT, VARIABLE_INITIALIZER]
					}
				]
			},
			JAVADOC_COMMENT,
			COMMENT
		]
	};

	// * COMMENTS & ANNOTATIONS

	const ANNOTATION_DECLARATION = {
		begin: regex.concat('@', APEX_IDENT_RE, /\b/),
		beginScope: 'meta',
		end: /(?=[\)])|$/,
		contains: [
			STATEMENT,
			{
				begin: '(',
				beginScope: 'punctuation',
				end: ')',
				endScope: 'punctuation',
				contains: [EXPRESSION]
			}
		]
	};

	const INTERFACE_MEMBERS = [
		JAVADOC_COMMENT,
		COMMENT,
		PROPERTY_DECLARATION,
		INDEXER_DECLARATION,
		METHOD_DECLARATION,
		PUNCTUATION_SEMICOLON
	];

	const MERGE_TYPE_STATEMENT = {
		match: [
			regex.concat(APEX_IDENT_RE, /\b/),
			/\s+/,
			regex.concat(APEX_IDENT_RE, /\b/),
			/\s*/,
			/\;/
		],
		scope: { 1: 'variable', 3: 'variable', 5: 'punctuation' }
	};

	const MERGE_EXPRESSION = {
		begin: [/merge\b/, /\s+/],
		beginScope: { 1: 'built_in' },
		end: /(?<=\;)/,
		contains: [OBJECT_CREATION_EXPRESSION, MERGE_TYPE_STATEMENT, EXPRESSION, PUNCTUATION_SEMICOLON]
	};

	const ELEMENT_ACCESS_EXPRESSION = {
		begin: regex.concat('/(?:(', APEX_IDENT_RE, '*)s*)?(?=[)'),
		beginScope: { 1: 'variable' },
		end: /(?<=\])(?!\s*\[)/,
		contains: [BRACKETED_ARGUMENT_LIST]
	};

	const MEMBER_ACCESS_EXPRESSION = [
		{
			// An identifier with no type parameters and a dot to the left should
			// be treated as a property, so long as it isn't followed by a ( or [.

			match: [
				/(?<=\.)\s*/,
				APEX_IDENT_RE,
				/\s*/,
				regex.concat('(?!', APEX_IDENT_RE, '|(|(?)?[|<)')
			],
			scope: { 2: 'property' },
			contains: [SAFE_NAVIGATOR_OR_ACCESSOR]
		},
		{
			// An identifier with type parameters should be treated as an object,
			// regardless of whether there is a dot to the left.
			/* (\??\.)?\s*
        (@?[_[:alpha:]][_[:alnum:]]*)
        (?<type_params>\s*<([^<>]|\g<type_params>)+>\s*)
        (?=
          (\s*\?)?
          \s*\.\s*@?[_[:alpha:]][_[:alnum:]]*
        )
      captures:
        '1':
          patterns:
          - include: '#punctuation-accessor'
          - include: '#operator-safe-navigation'
        '2': { name: variable.other.object.apex }
        '3':
          patterns:
          - include: '#type-arguments' */
		},
		{
			///  An identifier with no type parameters (and no dot to the left per the
			//  matches above) should be treated as an object.
			match: [APEX_ACCESSOR_RE, regex.concat('(?=(s*?)?s*.s*', APEX_ACCESSOR_RE, '*)')],
			scope: { 1: 'variable' } // variable.other.object.apex so may want to change to class
		}
	];

	const PARENTHESIZED_EXPRESSION = {
		begin: ')',
		beginScope: 'punctuation',
		end: ')',
		endScope: 'punctuation',
		contains: [EXPRESSION]
	};

	var EXPRESSION = [
		COMMENT,
		MERGE_EXPRESSION,
		SUPPORT_EXPRESSION,
		THROW_EXPRESSION,
		THIS_EXPRESSION,
		TRIGGER_CONTEXT_DECLARATION,
		CONDITIONAL_OPERATOR,
		EXPRESSION_OPERATORS,
		SOQL_QUERY_EXPRESSION,
		OBJECT_CREATION_EXPRESSION,
		ARRAY_CREATION_EXPRESSION,
		INVOCATION_EXPRESSION,
		MEMBER_ACCESS_EXPRESSION,
		ELEMENT_ACCESS_EXPRESSION,
		CAST_EXPRESSION,
		LITERAL,
		PARENTHESIZED_EXPRESSION,
		IDENTIFIER,
		'self'
	];

	// * ARGUMENTS

	const NAMED_ARGUMENT = {
		begin: [APEX_ACCESSOR_RE, /\s*/, /:/],
		beginScope: { 1: 'variable', 3: 'punctuation' },
		end: /(?=,|\)|\])/,
		contains: [EXPRESSION]
	};

	const ARGUMENT_LIST = {
		begin: '(',
		beginScope: 'punctuation',
		end: ')',
		endScope: 'punctuation',
		contains: [NAMED_ARGUMENT, EXPRESSION, PUNCTUATION_COMMA]
	};

	const BRACKETED_ARGUMENT_LIST = {};

	// * PARAMETERS
	const TYPE_PARAMETER_LIST = {
		begin: '<',
		beginScope: 'punctuation',
		end: '>',
		endScope: 'punctaution',
		excludeBegin: true,
		excludeEnd: true,
		contains: [
			COMMENT,
			PUNCTUATION_COMMA,
			{
				match: regex.concat(APEX_IDENT_RE, '\b'),
				scope: 'type'
			}
		]
	};

	// * DML

	const OBJECT_CREATION_EXPRESSION_WITH_NO_PARAMETERS = {
		match: [regex.either(...DML), /\s+/, 'new', /s+/]
	};

	// * CLASSES

	const SHARING_MODIFIER = {
		relevance: 10,
		match: [/(?<!\.)/, /\b(?:with|without|inherited)\s+sharing/],
		scope: {
			2: 'keyword'
		}
	};

	// * TRIGGERS

	const TRIGGER_PROPERTIES = [
		'isExecuting',
		'isInsert',
		'isUpdate',
		'isDelete',
		'isBefore',
		'isAfter',
		'isUndelete',
		'new',
		'newMap|10',
		'old',
		'oldMap|10',
		'size'
	];

	// TODO: Combine these two and move into TRIGGER_DECLARATION
	const TRIGGER_OPERATOR_STATEMENT = {
		match: /\b(insert|update|delete|merge|upsert|undelete)\b/,
		scope: 'keyword'
	};
	const TRIGGER_TYPE_STATEMENT = {
		match: /\b(before|after)\b/,
		scope: 'keyword'
	};

	const TRIGGER_CONTEXT_DECLARATION = {
		begin: [/\bTrigger/, /\./],
		beginScope: { 1: 'title.class', 2: 'punctuation' },
		end: /(?=\})|(?=;)|(?=\))|(?=\])/,
		contains: [
			EXPRESSION,
			{
				match: regex.concat(/\b/, regex.either(...TRIGGER_PROPERTIES), /\b/),
				scope: 'type'
			},
			{
				match: [/\??\./, APEX_IDENT_RE, /(?=\()/], // safe navigation
				scope: { 2: 'title.function.invoke' },
				contains: [PUNCTUATION_ACCESSOR, OPERATOR_SAFE_NAVIGATION]
			},
			{
				begin: '(',
				beginScope: 'punctuation',
				end: ')',
				endScope: 'punctuation',
				contains: [TRIGGER_TYPE_STATEMENT, JAVADOC_COMMENT, COMMENT, EXPRESSION]
			}
		]
	};
	const TRIGGER_DECLARATION = {
		begin: /(?=\btrigger\b)/,
		end: /(?<=\})/,
		contains: [
			{
				begin: [
					/\btrigger\b/,
					/\s+/,
					APEX_ACCESSOR_RE,
					/\s*/,
					/\bon\b/,
					/\s+/,
					APEX_IDENT_RE,
					/\s*/
				],
				beginScope: {
					1: 'keyword',
					3: 'title.class',
					5: 'operator',
					7: 'type'
				},
				end: /(?=\{)/,

				contains: [
					{
						begin: '(',
						beginScope: 'punctuation',
						end: ')',
						endScope: 'punctuation',
						contains: [
							TRIGGER_TYPE_STATEMENT,
							TRIGGER_OPERATOR_STATEMENT,
							PUNCTUATION_COMMA,
							EXPRESSION
						]
					},
					JAVADOC_COMMENT,
					COMMENT,
					TYPE_PARAMETER_LIST
				]
			},
			{
				begin: '{',
				beginScope: 'punctuation',
				end: '}',
				endScope: 'punctuation',
				contains: [STATEMENT, CLASS_OR_TRIGGER_MEMBERS]
			},
			JAVADOC_COMMENT,
			COMMENT
		]
	};

	// * CLASS DECLARATION

	const EXTENDS_CLASS = {
		begin: [/\bextends\b/, /\s+/, APEX_IDENT_RE],
		beginScope: { 1: 'keyword', 3: 'title.class.inherited' },
		end: /(?={|implements)/
	};

	const IMPLEMENTS_CLASS = {
		begin: [/\bimplements\b/, /\s+/, APEX_IDENT_RE],
		beginScope: { 1: 'keyword', 3: 'title.class.inherited' },
		end: /(?={|extends})/
	};

	const CLASS_DECLARATION = {
		begin: '(?=\bclass\b)',
		end: '(?<=})',
		contains: [
			{
				// class name
				begin: regex.concat(/\bclass\b\s+/, APEX_ACCESSOR_RE, /\s*/),
				beginScope: { 1: 'keyword', 2: 'title.class' },
				end: '(?={)',
				contains: [JAVADOC_COMMENT, COMMENT, TYPE_PARAMETER_LIST, EXTENDS_CLASS, IMPLEMENTS_CLASS]
			},
			{
				// class contents
				begin: '{',
				beginScope: 'punctuation',
				end: '}',
				endScope: 'punctuation',
				contains: [CLASS_OR_TRIGGER_MEMBERS]
			},
			JAVADOC_COMMENT,
			COMMENT
		]
	};

	// * CLASS AND TRIGGER COMMON

	const CLASS_OR_TRIGGER_MEMBERS = [
		JAVADOC_COMMENT,
		COMMENT,
		STORAGE_MODIFIER,
		SHARING_MODIFIER,
		TYPE_DECLARATIONS,
		FIELD_DECLARATION,
		PROPERTY_DECLARATION,
		INDEXER_DECLARATION,
		VARIABLE_INITIALIZER,
		CONSTRUCTOR_DECLARATION,
		METHOD_DECLARATION,
		PUNCTUATION_SEMICOLON
	];

	// * DECLARATIONS

	const TYPE_DECLARATIONS = [
		JAVADOC_COMMENT,
		COMMENT,
		ANNOTATION_DECLARATION,
		STORAGE_MODIFIER,
		SHARING_MODIFIER,
		CLASS_DECLARATION,
		ENUM_DECLARATION,
		INTERFACE_DECLARATION,
		TRIGGER_DECLARATION,
		PUNCTUATION_SEMICOLON
	];

	const DIRECTIVES = {
		contains: {
			PUNCTUATION_SEMICOLON
		}
	};

	const DECLARATIONS = [TYPE_DECLARATIONS, PUNCTUATION_SEMICOLON];

	const SCRIPT_TOP_LEVEL = [METHOD_DECLARATION, STATEMENT, PUNCTUATION_SEMICOLON];

	const KEYWORDS = {
		$pattern: '[A-Za-z][0-9A-Za-z_]*',
		keyword: APEX_KEYWORDS,
		//"variable.language": LANGUAGE_VARS,
		built_in: BUILT_INS,
		//type: TYPE_BUILTIN
		//literal: LITERALS // do not use
		number: NUMERIC_LITERAL_LIST,
		punctuation: PUNCTUATION,
		operator: EXPRESSION_OPERATORS
	};

	// * SOQL

	const OPERATOR_ASSIGNMENT = {
		scope: 'operator',
		match: /(?<!=|!)=(?!=)/
	};

	const METHOD_NAME_CUSTOM = {
		match: APEX_IDENT_RE,
		scope: 'title.function'
	};

	const SOQL_DATE_LITERALS = {
		variants: [
			{
				match:
					/\b((LAST_N_DAYS|NEXT_N_DAYS|NEXT_N_WEEKS|LAST_N_WEEKS|NEXT_N_MONTHS|LAST_N_MONTHS|NEXT_N_QUARTERS|LAST_N_QUARTERS|NEXT_N_YEARS|LAST_N_YEARS|NEXT_N_FISCAL_QUARTERS|LAST_N_FISCAL_QUARTERS|NEXT_N_FISCAL_YEARS|LAST_N_FISCAL_YEARS)\s*\:\d+)\b/
			},
			{
				match:
					/\b(YESTERDAY|TODAY|TOMORROW|LAST_WEEK|THIS_WEEK|NEXT_WEEK|LAST_MONTH|THIS_MONTH|NEXT_MONTH|LAST_90_DAYS|NEXT_90_DAYS|THIS_QUARTER|LAST_QUARTER|NEXT_QUARTER|THIS_YEAR|LAST_YEAR|NEXT_YEAR|THIS_FISCAL_QUARTER|LAST_FISCAL_QUARTER|NEXT_FISCAL_QUARTER|THIS_FISCAL_YEAR|LAST_FISCAL_YEAR|NEXT_FISCAL_YEAR)\b\s*/
			}
		],
		scope: 'keyword'
	};

	const FROM_CLAUSE = {
		match: ['FROM', /\b\s*/, APEX_IDENT_RE, /\b/],
		scope: { 1: 'keyword', 3: 'type' }
	};

	const SOQL_KEYWORDS = {
		match: regex.either(
			'ASC',
			'DESC',
			/ORDER\s+BY/,
			'NULLS FIRST',
			'NULLS LAST',
			'WHERE',
			/\b(ABOVE|AND|AT|FOR\s+REFERENCE|FOR UPDATE|FOR\s+VIEW|GROUP\s+BY|HAVING|IN|LIKE|LIMIT|NOT\s+IN|NOT|OFFSET|OR|TYPEOF|UPDATE\s+TRACKING|UPDATE\s+VIEWSTAT|WITH\s+DATA CATEGORY|WITH)\b\s*/,
			/USING\s+SCOPE\s*(Delegated|Everything|Mine|My_Territory|My_Team_Territory|Team)\b\s*/
		),
		scope: 'keyword'
	};

	const SOQL_COLON_METHOD_STATEMENT = {
		begin: [/(:?\.)?/, APEX_IDENT_RE, /(?=\()/],
		beginScope: { 1: 'punctuation', 2: 'title.function.invoke' },
		contains: [
			STATEMENT,
			{
				begin: '(',
				beginScope: 'punctuation',
				end: ')',
				endScope: 'punctuation',
				contains: [EXPRESSION]
			}
		]
	};

	const SOQL_COLON_VARS = {
		begin: /\:\s*/,
		beginScope: 'operator',
		end: regex.concat('/(?!', APEX_IDENT_RE, '|(|(?)?[|<)/'),
		contains: [
			TRIGGER_CONTEXT_DECLARATION,
			OPERATOR_REGEX,
			{
				match: regex.concat(APEX_IDENT_RE, /(?=\?\.|\.)/),
				scope: 'title.class'
			},
			SOQL_COLON_METHOD_STATEMENT,
			{
				match: APEX_IDENT_RE,
				scope: 'variable'
			}
		]
	};

	const SOQL_FUNCTIONS = {
		begin: [
			/\b(AVG|CALENDAR_MONTH|CALENDAR_QUARTER|CALENDAR_YEAR|convertCurrency|convertTimezone|COUNT|COUNT_DISTINCT|DAY_IN_MONTH|DAY_IN_WEEK|DAY_IN_YEAR|DAY_ONLY|toLabel|INCLUDES|EXCLUDES|FISCAL_MONTH|FISCAL_QUARTER|FISCAL_YEAR|FORMAT|GROUPING|GROUP\s+BY CUBE|GROUP\s+BY\s+ROLLUP|HOUR_IN_DAY|MAX|MIN|SUM|WEEK_IN_MONTH|WEEK_IN_YEAR)\s*/,
			/\(/
		],
		beginScope: { 1: 'keyword', 2: 'punctuation' },
		end: ')',
		endScope: 'punctuation',
		contains: [
			LITERAL,
			PUNCTUATION_COMMA,
			SOQL_FUNCTIONS,
			{
				match: APEX_IDENT_RE
				//scope: 'property'
			}
		]
	};

	const SOQL_GROUP_CLAUSES = {
		BEGIN: '(',
		beginScope: 'punctuation',
		end: ')',
		endScope: 'punctuation',
		contains: [
			SOQL_QUERY_EXPRESSION,
			SOQL_COLON_VARS,
			SOQL_GROUP_CLAUSES,
			PUNCTUATION_COMMA,
			OPERATOR_ASSIGNMENT,
			LITERAL,
			SOQL_KEYWORDS,
			SOQL_DATE_LITERALS,
			USING_SCOPE,
			{
				match: APEX_IDENT_RE
				//scope: 'property'
			}
		]
	};

	const SOQL_QUERY_BODY = [
		TRIGGER_CONTEXT_DECLARATION,
		SOQL_COLON_VARS,
		SOQL_FUNCTIONS,
		FROM_CLAUSE,
		WHERE_CLAUSE,
		SOQL_KEYWORDS,
		SOQL_DATE_LITERALS,
		USING_SCOPE,
		SOQL_GROUP_CLAUSES
	];

	const SOQL_QUERY_EXPRESSION = {
		begin: /\bSELECT\b/,
		beginScope: 'keyword',
		end: /(?=;)|(?=\])|(?=\))/,
		contains: [
			SOQL_QUERY_BODY,
			COMMENT,
			PUNCTUATION_COMMA,
			OPERATOR_ASSIGNMENT,
			PARENTHESIZED_EXPRESSION,
			EXPRESSION_OPERATORS,
			LITERAL,
			{
				match: [/[_.A-Za-z0-9][_.A-Z0-9a-z]*/, /\s*/, /(\,)?/],
				scope: { 1: 'property', 3: 'punctuation' }
			}
		]
	};

	return {
		name: 'Apex',
		aliases: ['apex', 'lightning'],
		case_insensitive: true, // language is case-insensitive
		disableAutodetect: false,
		ignoreIllegals: false,
		keywords: KEYWORDS,
		contains: [JAVADOC_COMMENT, COMMENT, DIRECTIVES, DECLARATIONS, SCRIPT_TOP_LEVEL],
		classNameAliases: {
			dot: 'punctuation',
			comma: 'punctuation'
		}
	};
}
