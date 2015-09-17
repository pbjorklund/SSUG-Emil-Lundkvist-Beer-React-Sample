"use strict";

var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var watchify = require("watchify");
var babel = require("babelify");
var browserifycss = require("browserify-css");
var inputFile = "beer.js";

function compile(watch) {
  var bundler = watchify(browserify("./src/" + inputFile, {
    debug: true
  }).transform(babel).transform(browserifycss, {global: true})).on("time", function (ms) {
    console.log("Finished compiling in " + ms + " milliseconds");
  });

  function rebundle() {
    bundler.bundle()
      .on("error", function(err) {
        console.error(err);
        this.emit("end");
      })
      .pipe(source(inputFile))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./dist"));

  }

  if (watch) {
    bundler.on("update", function() {
      console.log("    Working...");
      rebundle();
    });
  }
  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task("build", function() {
  return compile();
});
gulp.task("watch", function() {
  return watch();
});

gulp.task("default", ["watch"]);
