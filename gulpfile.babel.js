import gulp from 'gulp';

// JAVASCRIPT
import babel from 'gulp-babel'
import terser from 'gulp-terser';
// HTML
import htmlmin from 'gulp-htmlmin'
// CSS
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

// Pug
import pug from 'gulp-pug'

// SASS
import sass from 'gulp-sass'

// Common:
import concat from 'gulp-concat'

// Clean CSS
import clean from 'gulp-purgecss'

// Cache Bust
import cacheBust from 'gulp-cache-bust'

// Optimizacion imágenes (Solo se hace al final del desarrollo)
import imagemin from 'gulp-imagemin'
const mozjpeg = require('imagemin-mozjpeg') // Imagen requiere varios plugins en función del formato de la imagen

// Browser sync
import { init as server, stream, reload } from 'browser-sync'

// Plumber
import plumber from 'gulp-plumber'


// Si lo ponemos en true minifica el html
const production = false;

// Variables
const cssPlugins = [
    cssnano(),
    autoprefixer()
]



// Tareas Minificar Html
gulp.task('html-min', () => {
    return gulp
        .src('./src/*.html')
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public'))
})

// Tarea CSS: Concatenar, minifica y añade prefijos
gulp.task('styles', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(plumber())
        .pipe(concat('styles-min.css'))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream())
})

// Tarea JavaScript:
gulp.task('babel', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(plumber())
        .pipe(concat('scripts-min.js'))
        .pipe(babel())
        .pipe(terser())

        .pipe(gulp.dest('./public/js'))
})

// Tarea Pug
gulp.task('views', () => {
    return gulp.src('./src/views/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: production ? false : true
        }))
        .pipe(cacheBust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'))
})

// Tarea SASS
gulp.task('sass', () => {
    return gulp.src('./src/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/css'))
        .pipe(stream())
})

// Tarea limpiar el CSS que no se utiliza (al finlal del proyecto)
gulp.task('clean', () => {
    return gulp.src('./public/css/styles.css')
        .pipe(plumber())
        .pipe(clean({
            content: ['./public/*.html']
        }))
        .pipe(gulp.dest('./public/css'))
})

// Tarea comprimir imágenes
gulp.task('imgmin', () => {
    return gulp.src('./src/images/*')
        .pipe(plumber())
        .pipe(imagemin([
            // imagemin.gifsicle({interlaced: true}),
            // imagemin.mozjpeg({quality: 30, progressive: true}),
            // imagemin.optipng({optimizationLevel: 1})
            mozjpeg({ quality: 30, progressive: true }),
        ]))
        .pipe(gulp.dest('./public/images'))
})




// Tarea por defecto para que solo se llame al comando GULP en la terminal
gulp.task('default', () => {
    server({
        server: './public'
    })
    gulp.watch('./src/*.html', gulp.series('html-min')).on('change', reload)
    // gulp.watch('./src/css/*.css', gulp.series('styles'))
    // gulp.watch('./src/views/pages/**/*.pug', gulp.series('views')).on('change', reload)
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
    gulp.watch('./src/js/*.js', gulp.series('babel')).on('change', reload)
})