/**
 * Created by Alexandr on 11.03.2017.
 */

'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    build: {
        js: 'public/js/', 
        style: 'public/css/'
    },
    src: {
        js: 'app/app.js',
        style: 'css/style.scss'
    },
    watch: { 
        js: 'app/**/*.js',
        style: 'css/*.css'
    }
};

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
});

gulp.task('build', ['js:build', 'style:build'])

gulp.task('default', ['build', 'watch']);