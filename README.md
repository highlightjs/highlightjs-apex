# Apex - a language grammar for the [Salesforce Platform](https://developer.salesforce.com)

## Demo

The below screenshot was captured from a [demo webpage](demo/testcode.html) after dropping `highlight.min.js` to a `dist` folder.
(Code taken from [Salesforce Trigger Framework](https://github.com/dschach/salesforce-trigger-framework) and Highlight Java example code)
![Demo](demo/ApexHighlighting.png)

## Usage

Simply include the Highlight.js library in your webpage, then load this module.

### Static website or simple usage

Simply load this module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/highlightjs-apex/dist/apex.min.js"></script>
<!-- Use any stylesheet you'd like - though it's best to choose from those in highlightjs core repo -->
<link rel="stylesheet" href="/path/to/highlightjs-apex/demo/highlight.css" />
<script type="text/javascript">
	hljs.highlightAll();
</script>
```

For more details of the usage see [Highlight.js main page](https://github.com/highlightjs/highlight.js#highlightjs).

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlight.js');
var hljsApexTxt = require('highlightjs-apex');

hljs.registerLanguage('apex', hljsApexTxt);
hljs.highlightAll();
```

## License

Highlight.js is released under the BSD 3-Clause License. See [LICENSE](/LICENSE) file for details.

## Author

[David Schach](https://github.com/dschach)

## Contribution

Feel free to create issues or (even better) pull requests.

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Apex: <https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm>
