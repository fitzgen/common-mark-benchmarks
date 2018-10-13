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

function createSuite({ name, input}) {
  const suite = new Benchmark.Suite(name);
  suite.input = input;
  suite
    .add("commonmark.js", () => {
      const p = new commonmark.Parser();
      const r = new commonmark.HtmlRenderer();
      return r.render(p.parse(input));
    })
    .add("markdown-it", () => markdownIt.render(input))
    .add("marked", () => marked(input))
    .add("pulldown-cmark-wasm", () => pulldownCmarkWasm.format(input))
    .add("showdown", () => {
      const c = new showdown.Converter();
      return c.makeHtml(input);
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
