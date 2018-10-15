const Benchmark = require("benchmark");

// Markdown implementations.
const commonmark = require("commonmark");
const markdownIt = require("markdown-it")("commonmark");
const marked = require("marked");
const pulldownCmarkWasm = require("pulldown-cmark-wasm");
const showdown = require("showdown");

// Local imports.
const benchmarks = require("./benchmarks");
const runner = require("./runner");

function assertExpected(lib, expected, html) {
  if (expected && (html.trim() != expected.trim())) {
    console.error(`${lib} did not generate expected html!`);
    console.error("    expected =", expected);
    console.error("      actual =", html);
    throw new Error(`${lib} did not generate expected html!`);
  }
}

function createSuite({ name, input, expected }) {
  const suite = new Benchmark.Suite(name);
  suite.input = input;
  suite
    .add("commonmark.js", () => {
      const p = new commonmark.Parser();
      const r = new commonmark.HtmlRenderer();
      const html = r.render(p.parse(input));
      assertExpected("commonmark.js", expected, html);
      return html;
    })
    .add("markdown-it", () => {
      const html = markdownIt.render(input);
      assertExpected("markdown-it", expected, html);
      return html;
    })
    .add("marked", () => {
      const html = marked(input);
      assertExpected("marked", expected, html);
      return html;
    })
    .add("pulldown-cmark-wasm", () => {
      const html = pulldownCmarkWasm.format(input);
      assertExpected("pulldown-cmark-wasm", expected, html);
      return html;
    })
    .add("showdown", () => {
      const c = new showdown.Converter();
      const html = c.makeHtml(input);
      assertExpected("showdown", expected, html);
      return html;
    });
  return suite;
}

function createSuites() {
  return benchmarks.map(createSuite);
}

function main() {
  const suites = createSuites();
  runner.run(suites);
}

main();
