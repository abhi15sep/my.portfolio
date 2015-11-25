'use strict';

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'), // minify css
    prefixer = require('gulp-autoprefixer'), // prefix for browsers (-o, -moz)
    rename = require("gulp-rename"), // rename files
    concat = require('gulp-concat'), // concat js
    uglify = require('gulp-uglify'), // minify js
    imagemin = require('gulp-imagemin'), //minify img
    importCss = require('gulp-import-css'), //import css one to one css
    pngquant = require('imagemin-pngquant'), // minify for png files
    rimraf = require('rimraf'), //deleting files
    less = require('gulp-less'), //less compilation
    uncss = require('gulp-uncss'),//delete unused styles
    watch = require('gulp-watch'); // tracking changes to files

var path = {
    src: { //path of source
        html: 'src/*.html',
        js: [
            './bower_components/jquery/dist/jquery.js',
            './bower_components/lightbox2/dist/js/lightbox.js',
            './bower_components/twig.js/twig.js',
            './bower_components/routie/dist/routie.js',
            './src/js/app.js'
        ],
        css: 'src/css/main.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        view: 'src/view/**/*.*',
        data: 'src/data/**/*.*',
        favicon: 'src/favicon.png'
    },
    build: { //path of build
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img',
        fonts: 'build/fonts',
        view: 'build/view',
        data: 'build/data',
        favicon: 'build/'
    },
    watch: { //see after
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        view: 'src/view/**/*.*',
        data: 'build/data/**/*.*',
        favicon: 'src/favicon.png'
    },
    clean: './build'
};

//html
gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
});

//favicon
gulp.task('favicon:build', function(){
    gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.build.favicon))
});

//js
gulp.task('js:build', function(){
    gulp.src(path.src.js)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.js))
});

//css
gulp.task('css:build', function(){
    gulp.src(path.src.css)
        .pipe(less())
        .pipe(importCss())
        .pipe(minifyCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
});

//image
gulp.task('img:build', function(){
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
});

//view
gulp.task('view:build',function(){ // copy fonts from source to build
    gulp.src(path.src.view)
        .pipe(gulp.dest(path.build.view))
});

//fonts
gulp.task('fonts:build',function(){ // copy fonts from source to build
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

//data
gulp.task('data:build',function(){ // copy fonts from source to build
    gulp.src(path.src.data)
        .pipe(gulp.dest(path.build.data))
});

gulp.task('build', [ // building task
    'html:build',
    'js:build',
    'css:build',
    'view:build',
    'fonts:build',
    'img:build',
    'data:build',
    'favicon:build'
]);

gulp.task('watch', function(event, cb){
    watch([path.watch.html], function(event, cb){
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb){
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb){
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb){
        gulp.start('img:build');
    });
    watch([path.watch.view], function(event, cb){
        gulp.start('view:build');
    });
    watch([path.watch.fonts], function(event, cb){
        gulp.start('fonts:build');
    });
    watch([path.watch.data], function(event, cb){
        gulp.start('data:build');
    });
    watch([path.watch.favicon], function(event, cb){
        gulp.start('favicon:build');
    });
});

gulp.task('clean', function(cb){ // gulp clean
    rimraf(path.clean, cb);
});
