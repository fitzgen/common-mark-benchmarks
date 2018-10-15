const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

let BENCHMARKS = [];

function finishBenchmarks() {
  fs.writeFileSync("./benchmarks.js", "module.exports = " + JSON.stringify(BENCHMARKS));
}

function addBenchmark(name, input, expected = null) {
  BENCHMARKS.push({ name, input, expected });
}

function addMdFilesInDir(dir) {
  fs.readdirSync(dir)
    .filter(f => f.endsWith("md"))
    .map(f => {
      const g = path.join(dir, f);
      addBenchmark(g, fs.readFileSync(g, "utf-8"))
    });
}

function addMarkdownItBenchmarks() {
  addMdFilesInDir("./markdown-it/benchmark/samples");
}

function addCommonMarkSpecBenchmark() {
  addBenchmark("CommonMark spec", fs.readFileSync("./CommonMark/spec.txt", "utf-8"));
}

function addGithubFrontendJsBenchmarks() {
  addMdFilesInDir("./github-explore-frontend-js");
}

function addEntitiesBenchmark() {
  // Because some of these common mark librarires don't follow the spec with
  // regards to entity canonicalization, add an expected output to this
  // benchmark.
  addBenchmark("Entities", fs.readFileSync("./entities.md", "utf-8"), "<p>Æ &amp; Á Ă Â А 𝔄 À Α Ā ⩓ Ą 𝔸 ⁡ Å 𝒜 ≔ Ã Ä ∖ ⫧ ⌆ Б ∵ ℬ Β 𝔅 𝔹 ˘ ℬ ≎ Ч © Ć ⋒ ⅅ ℭ Č Ç Ĉ ∰ Ċ ¸ · ℭ Χ ⊙ ⊖ ⊕ ⊗ ∲ ” ’ ∷ ⩴ ≡ ∯ ∮ ℂ ∐ ∳ ⨯ 𝒞 ⋓</p>");
}

function buildBenchmarks() {
  addMarkdownItBenchmarks();
  addCommonMarkSpecBenchmark();
  addGithubFrontendJsBenchmarks();
  addEntitiesBenchmark();
  finishBenchmarks();
}

function main() {
  buildBenchmarks();
}

main();
