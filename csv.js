const csvRow = exports.csvRow = function ({
  input,
  inputLength,
  library,
  engine,
  time
}) {
  return `"${input}",${inputLength},"${library}","${engine}",${time}\n`;
};

exports.csvHeader = function () {
  return csvRow({
    input: "input",
    inputLength: "\"inputLength\"",
    library: "library",
    engine: "engine",
    time: "\"time\"",
  });
};
