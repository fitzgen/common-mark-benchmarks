// Benchmark suite runner for Node.js.
//
// Just runs the test suites immediately and writes them as a CSV file to disk.

const fs = require("fs");
const { csvHeader, csvRow } = require("./csv");

exports.run = function (suites) {
  const csvFile = `bench-${Math.random().toString(16).slice(2)}.csv`;
  console.log(`Writing results to ${csvFile}`);
  fs.appendFileSync(csvFile, csvHeader());

  suites.forEach(s => runSuite(csvFile, s));
};

function runSuite(csvFile, suite) {
  suite.on("start", function (event) {
    console.log(`Starting benchmark "${event.currentTarget.name}"`);
  });

  suite.on("cycle", function (event) {
    console.log(".");

    for (const s of event.target.stats.sample) {
      fs.appendFileSync(csvFile, csvRow({
        input: suite.name,
        inputLength: suite.input.length,
        library: event.target.name,
        engine: "node.js",
        time: s,
      }))
    }
  });

  suite.on("complete", function (event) {
    console.log(`Finished benchmark "${event.currentTarget.name}"`);
  });

  suite.on("error", function (error) {
    console.error("Error while running benchmarks!");
    console.error(error);
  });

  suite.run();
}
