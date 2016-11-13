var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require('gulp-imagemin');

var dirs = {
    imgSrc: 'src/images/**/*',
    imgOutput: 'web/images',
    cssSrc: 'components/sass/style.scss',
    cssOutput: 'web/css'
};

gulp.task('images',function(){
    gulp.src(dirs.imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(dirs.imgOutput));
});

gulp.task('sass',function(){
    gulp.src(dirs.cssSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.cssOutput));
});

gulp.task('default', ['sass', 'images'], function(){
    console.log("Hello World!");
});