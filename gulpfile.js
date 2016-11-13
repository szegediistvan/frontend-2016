var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jsonminify = require('gulp-jsonminify');
var coffee = require('gulp-coffee');
var changed = require('gulp-changed');
var clean = require('gulp-clean');

/*
var plugins = require("gulp-load-plugins")({
    lazy: false,
    rename: {
        'gulp-clean-css': 'minify'
    }
});

gulp.task('images', function () {
    gulp.src(dirs.imgSrc)
        .pipe(plugins.changed()(dirs.imgOutput))
        .pipe(plugins.imagemin()())
        .pipe(gulp.dest(dirs.imgOutput));
});
*/

var dirs = {
    imgSrc: 'src/images/**/*',
    imgOutput: 'web/images',
    sassSrc: 'components/sass/*',
    cssSrc: 'components/sass/style.scss',
    cssOutput: 'web/css',
    htmlSrc: 'src/*.html',
    htmlOutput: 'web',
    coffeeSrc: ['components/coffee/tagline.coffee'],
    coffeeOutput: 'components/scripts',
    jsSrc: [
        'components/scripts/rclick.js',
        'components/scripts/pixgrid.js',
        'components/scripts/tagline.js',
        'components/scripts/template.js'
    ],
    jsOutput: 'web/js',
    jsonSrc: 'src/js/*.json'
};

gulp.task('sass', function () {
    gulp.src(dirs.cssSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.cssOutput));
});

gulp.task('images', function () {
    gulp.src(dirs.imgSrc)
        .pipe(changed(dirs.imgOutput))
        .pipe(imagemin())
        .pipe(gulp.dest(dirs.imgOutput));
});

gulp.task('html', function () {
    gulp.src(dirs.htmlSrc)
        .pipe(minifyHTML())
        .pipe(gulp.dest(dirs.htmlOutput))
});

gulp.task('coffee', function () {
    gulp.src(dirs.coffeeSrc)
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest(dirs.coffeeOutput))
});

gulp.task('js', ['coffee'], function () {
    gulp.src(dirs.jsSrc)
        .pipe(sourcemaps.init())
        .pipe(browserify())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.jsOutput))
});

gulp.task('json', function () {
    gulp.src(dirs.jsonSrc)
        .pipe(jsonminify())
        .pipe(gulp.dest(dirs.jsOutput))
});

gulp.task('clean', function () {
    gulp.src('web', {read: false})
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch(dirs.coffeeSrc, ['coffee']);
    gulp.watch(dirs.sassSrc, ['sass']);
    gulp.watch(dirs.htmlSrc, ['html']);
    gulp.watch(dirs.imgSrc, ['images']);
    gulp.watch(dirs.jsSrc, ['js']);
    gulp.watch(dirs.jsonSrc, ['json']);
});

gulp.task('default', ['sass', 'images', 'coffee', 'js', 'json', 'html', 'watch'], function () {
    console.log("Hello World!");
});