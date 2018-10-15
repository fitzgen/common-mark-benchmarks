// Benchmark suite runner for the Web.
//
// Writes the human readable results to the DOM, and also builds up a CSV inside
// of a <textarea>.

const { csvHeader, csvRow } = require("./csv");

const button = document.getElementById("run-benchmarks");
const errorsContainer = document.getElementById("errors-container");
const errors = document.getElementById("errors");
const resultsContainer = document.getElementById("results-container");
const results = document.getElementById("results");
const csvContainer = document.getElementById("csv-container");
const csv = document.getElementById("csv");
const copy = document.getElementById("copy");

exports.run = function (suites) {
  button.addEventListener("click", () => runSuites(suites));

  copy.addEventListener("click", () => {
    csv.removeAttribute("disabled");
    csv.select();
    document.execCommand("copy");
    csv.setAttribute("disabled", "");
  });
};

function yieldTick() {
  return new Promise(r => setTimeout(r, 1));
}

function show(el) {
  el.removeAttribute("hidden");
}

async function runSuites(suites) {
  try {
    button.setAttribute("disabled", "");
    csv.textContent += csvHeader();

    show(csvContainer);
    show(resultsContainer);

    let i = 0;
    let n = suites.length;
    for (const s of suites) {
      button.textContent = `Running benchmarks... (${++i}/${n})`;
      await runSuite(s);
    }

    copy.removeAttribute("disabled");

    button.textContent = "Benchmarks finished; refresh to re-run benchmarks";
  } catch (e) {
    console.error(e);
  }
}

const engine = (function () {
  let ua = window.navigator.userAgent;
  return ua.includes("Chrome") ? "Chrome"
    : ua.includes("Edge") ? "Edge"
    : ua.includes("Firefox") ? "Firefox"
    : ua.includes("Safari") ? "Safari"
    : "unknown-browser";
}());

async function runSuite(suite) {
  const suiteLi = document.createElement("li");
  const suiteHeader = document.createElement("h3");
  suiteHeader.textContent = `${suite.name} (size = ${suite.input.length})`;
  suiteLi.appendChild(suiteHeader);
  const suiteUl = document.createElement("ul");
  suiteLi.appendChild(suiteUl);
  results.appendChild(suiteLi);

  suite.on("cycle", event => {
    const li = document.createElement("li");
    li.textContent = event.target.toString();
    suiteUl.appendChild(li);

    for (const s of event.target.stats.sample) {
      csv.textContent += csvRow({
        input: suite.name,
        inputLength: suite.input.length,
        library: event.target.name,
        engine,
        time: s,
      });
    }
  });

  const suiteCompleted = new Promise(resolve => {
    suite.on("complete", resolve);
  });

  suite.on("error", event => {
    show(errorsContainer);
    errors.textContent += `

${event.target.name} threw an error or produced incorrect output on the ${event.currentTarget.name} benchmark!`;
  });

  suite.run({ "async": true });
  await Promise.all([yieldTick, suiteCompleted]);
}
