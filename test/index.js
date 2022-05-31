require('should');
const promisify = require('util').promisify;
const path = require('path');
const hljs = require('highlight.js');
const fs = require('fs');
const hljsDefineApex = require('../src/languages/apex');
hljs.registerLanguage('apex', hljsDefineApex);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

describe('Apex syntax highlighting', () => {
  async function itShouldPerformSyntaxHighlighting() {
    hljs.registerLanguage('apex', hljsDefineApex);
    const files = (await readdir(path.join(__dirname, 'markup/apex')))
      .filter(f => !f.includes('.expect.'));
    const scenarios = files.map(f => f.replace(/\.txt$/, ''));
    scenarios.forEach(scenario => {
      it(`should perform syntax highlighting on ${scenario}`, async () => {
        const file = `${scenario}.txt`;
        const filePath = path.join(__dirname, 'markup/apex', file);
        const expectFilePath = filePath.replace('.txt', '.expect.txt');
        const code = await readFile(filePath, 'utf-8');
        const expected = await readFile(expectFilePath, 'utf-8');
        const result = hljs.highlight('apex', code);
        const actual = result.value;
        actual.trim().should.eql(expected.trim(), file);
      });
    })
  }

  itShouldPerformSyntaxHighlighting();

  // The following test is ignored because the language detected is java.
  // Since the Apex syntax can be confused with Java, I don't think we should use "highlightAuto" (as it will produce unexpected results)
  xit('should detect apex language', async () => {
    var code = await readFile(path.join(__dirname, 'detect/apex', 'apexdetect.txt'), 'utf-8');
    var actual = hljs.highlightAuto(code).language;
    actual.should.eql('apex');
  });
});
