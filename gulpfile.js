/**
 *
 *  React SlideShow App (ES6)
 *  Copyright 2016 Mokoversity Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var browserSync = require("browser-sync");
var babel = require('gulp-babel');
var react = require('gulp-react');
var browserify = require('gulp-browserify');

// Convert JSX and compile ES2015 to JavaScript
gulp.task('build', function () {
  return gulp.src('src/**/*.jsx')
      .pipe(react({
        es6module: true
      }))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('src'));
});

// Browserify
gulp.task('browserify', function () {
    return gulp.src('src/App.js')
      .pipe(browserify())
      .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(['src/**/*.jsx'], ['build']);
    gulp.watch(['src/**/*.js'], ['browserify']);
});

// Default Task
gulp.task('default', [], function (cb) {
    gulp.start('build', cb);
});

// Live Reload
gulp.task('browser', function (cb) {
    browserSync.init(null, {
        server: {
            baseDir: ['dist']
        },
        notify: false
    });
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css'
    ], browserSync.reload);
});
