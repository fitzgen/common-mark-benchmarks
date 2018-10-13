import("./index.js")
  .then(() => console.log("Loaded!"))
  .catch(e => console.error("error loading bundle!\n\n" + e));
