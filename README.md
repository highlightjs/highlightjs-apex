# Apex - a language grammar for the [Salesforce Platform](https://developer.salesforce.com)

[![NPM](https://nodei.co/npm/highlightjs-apex.png)](https://npmjs.org/package/highlightjs-apex)

## Demo

The below screenshot was captured from a [demo webpage](demo/testcode.html) after dropping `highlight.min.js` to a `dist` folder.
(Code taken from [Salesforce Trigger Framework](https://github.com/dschach/salesforce-trigger-framework) and Highlight Java example code)
![Demo](demo/ApexHighlighting.png)

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load this module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/apex.min.js"></script>
<!-- Use any stylesheet you'd like - though it's best to choose from those in highlightjs core repo -->
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

### Using directly from the UNPKG CDN

```html
<script type="text/javascript"
  src="https://unpkg.com/highlightjs-apex/dist/apex.min.js"></script>
```

- More info: <https://unpkg.com>

### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlightjs');
var hljsApex = require('highlightjs-apex');

hljs.registerLanguage('apex', hljsApex);
hljs.highlightAll();
```


### React

You need to import both Highlight.js and third-party language like Apex:

```js
import React, {Component} from 'react'
import 'highlight.js/scss/vs.scss' # your favourite theme
import apex from './apex'
import hljs from 'highlight.js'
hljs.registerLanguage('apex', apex);

class Highlighter extends Component
{
  constructor(props)
  {
    super(props);
    hljs.highlightAll();
  }

  render()
  {
    let {children} = this.props;
    return
    {
      <pre ref={(node) => this.node = node}>
        <code className="language-apex">
          {children}
        </code>
      </pre>
    }
  }
}

export default Highlighter;
```

## License

Highlight.js is released under the BSD 3-Clause License. See [LICENSE](https://github.com/highlightjs/highlight.js/blob/main/LICENSE) file for details.
Highlightjs-apex is released under the MIT License. See [LICENSE](/LICENSE.md) file for details.

## Author

David Schach [[David Schach](https://github.com/dschach)](https://github.com/dschach)

## Contribution

Feel free to create issues or (even better) pull requests.

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Apex: <https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm>
