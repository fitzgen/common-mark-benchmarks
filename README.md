# Benchmarks for JS/Wasm Common Mark (markdown) Implementations

This benchmark suite compares the performance of markdown-to-HTML conversion of
the following libraries:

* [commonmark.js](https://github.com/commonmark/commonmark.js)
* [markdown-it](https://github.com/markdown-it/markdown-it)
* [marked](https://marked.js.org)
* [pulldown-cmark-wasm](https://github.com/tschneidereit/pulldown-cmark-wasm)
* [showdown](https://github.com/showdownjs/showdown)

## Running the Benchmarks

First, make sure that the submodules are initialized:

```
git submodule update --init
```

Next, ensure that the dependencies are installed:

```
npm install
```

Build the benchmarks:

```
npm run build
```

Now you're ready to run the benchmarks! They can be run in either a Web browser
or in Node.js.

### In a Web Browser

To start a local server for the benchmarks, run this command:

```
npm run serve
```

This will also open the benchmarks Web page in your default browser. After
running the benchmarks in that Web page, you will have the option to copy the
raw data as CSV.

### In Node.js

To run the benchmarks in Node.js and write their raw results to a local CSV
file, run this command:

```
npm run bench
```

## Plotting Results

TODO

## Input Corpus

### Inputs Adopted from Other Markdown Benchmarks

* [X] **The `markdown-it` benchmark suite.** This suite has also been adopted by
      commonmark.js. It consists of mostly small, synthetic snippets of
      markdown, not markdown source files taken from the wild.

* [X] **The Common Mark specification.** The Common Mark specification is itself
      written in markdown. This is a real, non-synthetic markdown file from the
      wild and is also of a non-trivial input size.

* [ ] **Pro Git by Scott Chacon.** The commonmark.js project timed their
      implementation on the concatenated source files of this book, which is
      written in markdown. We adopt it here.

### Additional Inputs

* [X] **HTML entities.** Common mark requires normalizing HTML entities into
      their unicode represenation. This behavior is not particularly
      well-exercised by existing benchmark inputs, so we add a synthetic
      benchmark to stress it.

* [X] **`README.md` files from popular JavaScript projects.** We visited each of
      the repositories listed in [GitHub's fontend JavaScript frameworks section
      of their explore
      page](https://github.com/collections/front-end-javascript-frameworks) and
      collected the `README.md` files (if present) from each of them. We were
      concerned that most existing benchmarks' inputs were both synthetic and
      small. By adding these we intend to round out the corpus with more real
      world inputs.
