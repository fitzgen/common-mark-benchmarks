const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

let BENCHMARKS = [];

function finishBenchmarks() {
  fs.writeFileSync("./benchmarks.js", "module.exports = " + JSON.stringify(BENCHMARKS));
}

function addBenchmark(name, input) {
  BENCHMARKS.push({ name, input });
}

function addMarkdownItBenchmarks() {
  let markdownItSamples = "./markdown-it/benchmark/samples";
  fs.readdirSync(markdownItSamples)
    .filter(f => f.endsWith("md"))
    .map(f => {
      const g = path.join(markdownItSamples, f);
      addBenchmark(g, fs.readFileSync(g, "utf-8"))
    });
}

function addCommonMarkSpecBenchmark() {
  addBenchmark("CommonMark spec", fs.readFileSync("./CommonMark/spec.txt", "utf-8"));
}

function buildBenchmarks() {
  addMarkdownItBenchmarks();
  addCommonMarkSpecBenchmark();
  finishBenchmarks();
}

function main() {
  buildBenchmarks();
}

main();
