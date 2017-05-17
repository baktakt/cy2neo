var gulp = require('gulp'); 
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

//script paths
var jsFiles = 'scripts/**/*.js',  
    jsDest = 'dist/scripts',
    cssFiles = 'styles/**/*.css',
    cssDest = 'dist/css';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('visualizer.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('visualizer.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('styles', function() {  
    
    return gulp.src(cssFiles)
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('visualizer.min.css'))
        .pipe(gulp.dest(cssDest))
});



