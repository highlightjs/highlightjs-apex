![](./assets/salesforce_platform.png)

# Apex - a language grammar for the [Salesforce Platform](https://developer.salesforce.com)

[![NPM](https://nodei.co/npm/highlightjs-apex.png)](https://www.npmjs.com/package/highlightjs-apex)

[![npm](https://img.shields.io/npm/v/highlightjs-apex)](https://www.npmjs.com/package/highlightjs-apex)
[![npm](https://img.shields.io/npm/dt/highlightjs-apex)](https://www.npmjs.com/package/highlightjs-apex)
![install size](https://badgen.net/packagephobia/install/highlightjs-apex)
[![GitHub](https://img.shields.io/github/license/highlightjs/highlightjs-apex)](https://github.com/highlightjs/highlightjs-apex/blob/main/LICENSE.md)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/highlightjs-apex)
[![CDN download](https://badgen.net/badge/jsDelivr/download/blue?icon=jsdelivr)](https://cdn.jsdelivr.net/npm/highlightjs-apex/dist/apex.min.js)

## Demo

The screenshot was captured from a [demo webpage](demo/testcode.html) using `highlight.min.js` from the `dist` folder.
(Code taken from [Salesforce Trigger Framework](https://dschach.github.io/salesforce-trigger-framework/))
![Demo](demo/ApexHighlighting.png)

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module. For more complex usage, see [highlight.js usage](https://github.com/highlightjs/highlight.js#basic-usage).

### Static website or simple usage

Simply load this module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/apex.min.js"></script>
<!-- Use any stylesheet you'd like - though it's best to choose from 
	those in highlightjs core repo -->
<link rel="stylesheet" href="https://unpkg.com/highlightjs/styles/vs.css" />
<script type="text/javascript">
	hljs.highlightAll();
</script>
```

This will find and highlight code inside of `<pre><code>` tags; it tries to detect the language automatically. If automatic detection doesn’t work for you, you can specify the language in the `class` attribute:

```html
<pre>
    <code class="language-apex">
    ...
    </code>
</pre>
```

For more details see [Highlight.js main page](https://github.com/highlightjs/highlight.js#highlightjs).

### Using directly from jsDelivr

```html
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
<script
	type="text/javascript"
	src="https://cdn.jsdelivr.net/npm/highlightjs-apex/dist/apex.min.js"></script>
```

- More info: <https://www.jsdelivr.com/>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsApex = require('highlightjs-apex');

hljs.registerLanguage('apex', hljsApex);
hljs.highlightAll();
```

## License

Highlight.js is released under the BSD 3-Clause License. See [LICENSE](https://github.com/highlightjs/highlight.js/blob/main/LICENSE) file for details.
Highlightjs-apex is released under the MIT License. See [LICENSE](/LICENSE.md) file for details.

## Author

David Schach [https://github.com/dschach](https://github.com/dschach)

## Contribution

Feel free to create issues or (even better) pull requests.

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Apex: <https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm>
