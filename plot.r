#!/usr/bin/env Rscript

# Usage:
#
#     plot.r input.csv
#
# Output will be placed in Rplots.pdf.

library(ggplot2)

args <- commandArgs(trailingOnly = TRUE)

results <- read.table(args[1], header = TRUE, sep = ",")
results$timeBySize <- results$time / results$inputLength
results$ops  <- 1 / results$time
results$opsBySize  <- results$ops / results$inputLength

markdownIt <- subset(results, grepl("markdown-it", results$input))
spec <- subset(results, grepl("CommonMark spec", results$input))
entities <- subset(results, grepl("Entities", results$input))
github <- subset(results, grepl("github", results$input))

lineGraph <- function(title, data, axisTitleX, x, axisTitleY, y, group) {
    ggplot(data, aes(x = x,
                     y = y,
                     color = group,
                     pch = group,
                     fill = group)) +
        stat_summary(fun.y = mean, geom = "line") +
        stat_summary(fun.y = mean, geom = "point") +
        stat_summary(geom = "ribbon", aes(alpha = 0.25)) +
        theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
        ggtitle(title) +
        labs(x = axisTitleX, y = axisTitleY)
}

jitterBox <- function(title, axisTitleX, x, axisTitleY, y) {
    ggplot(data, aes(x = x,
                     y = y,
                     color = x,
                     pch = x)) +
        geom_boxplot() +
        geom_jitter()
}

barGraph <- function (title, data, axisTitleX, x, axisTitleY, y) {
    ggplot(data, aes(x = x,
                     y = y,
                     color = x,
                     pch = x,
                     fill = x)) +
        geom_bar(stat = "summary", fun.y = "mean") +
        theme(legend.position = "none",
              axis.text.x = element_text(angle = 45, hjust = 1)) +
        ggtitle(title) +
        labs(x = axisTitleX, y = axisTitleY)
}

lineGraph("Time to render HTML (all inputs)",
          results,
          "String length (code points)", results$inputLength,
          "Time to render to HTML (milliseconds)", results$time,
          results$library)

barGraph("Time to render HTML (all inputs)",
         results,
         "Library", results$library,
         "Time per code point (milliseconds / code points)", results$timeBySize)

lineGraph("Time to render HTML (markdown-it benchmark suite)",
          markdownIt,
          "String length (code points)", markdownIt$inputLength,
          "Time (milliseconds)", markdownIt$time,
          markdownIt$library)

barGraph("Time to render HTML (markdown-it benchmark suite)",
         markdownIt,
         "Library", markdownIt$library,
         "Time per code point (milliseconds / code points)", markdownIt$timeBySize)

lineGraph("Time to render HTML (github explore benchmark suite)",
          github,
          "String length (code points)", github$inputLength,
          "Time (milliseconds)", github$time,
          github$library)

barGraph("Time to render HTML (github explore benchmark suite)",
         github,
         "Library", github$library,
         "Time per code point (milliseconds / code points)", github$timeBySize)

barGraph("Time to render CommonMark spec to HTML",
         spec,
         "Library", spec$library,
         "Time (milliseconds)", spec$time)

barGraph("Time to render markdown with HTML entities to HTML",
         entities,
         "Library", entities$library,
         "Time (milliseconds)", entities$time)
