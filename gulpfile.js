"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

const dist = "./dist";

gulp.task("copy-html", () => {
  return gulp.src("./src/*.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp.src("./src/sass/style.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: 'script.js'
      },
      watch: false,
      devtool: "source-map",
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist))
    .on("end", browsersync.reload);
});

gulp.task('fonts', function () {
  return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest(dist + "/fonts"))
    .pipe(browsersync.stream());
});

gulp.task('icons', function () {
  return gulp.src("src/icons/**/*")
    .pipe(gulp.dest(dist + "/icons"))
    .pipe(browsersync.stream());
});

gulp.task('images', function () {
  return gulp.src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(dist + "/img"))
    .pipe(browsersync.stream());
});

gulp.task("build", gulp.parallel("copy-html", "build-js", "build-sass", "fonts", "icons", "images"));

gulp.task("watch", () => {
  browsersync.init({
    server: {
      baseDir: "./dist/",
      serveStaticOptions: {
        extensions: ["html"]
      }
    },
    port: 4000,
    notify: true
  });

  gulp.watch("./src/*.html", gulp.parallel("copy-html"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
  gulp.watch("./src/sass/**/*.scss", gulp.parallel("build-sass"));
  gulp.watch("./src/fonts/**/*").on('all', gulp.parallel('fonts'));
  gulp.watch("./src/icons/**/*").on('all', gulp.parallel('icons'));
  gulp.watch("./src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task("prod", () => {
  gulp.src("./src/sass/style.scss")
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest(dist));

  gulp.src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist));

  return gulp.src("./src/js/main.js")
    .pipe(webpack({
      mode: 'production',
      output: {
        filename: 'script.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));