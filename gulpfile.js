/* import {src, dest, series, parallel, watch} from gulp
import browserSync from 'browser-sync'
import notify from 'gulp-notify'
import woff from 'gulp-ttf2woff'
import woff2 from 'gulp-ttf2woff2'
import include from 'gulp-file-include'
import htmlmin from 'gulp-htmlmin'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cssmin from 'gulp-csso'
import rename from 'gulp-rename'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp' */

const { src, dest, series, parallel, watch } = require("gulp")
const sass = require("gulp-sass")
const cssmin = require("gulp-csso")
const include = require("gulp-file-include")
const htmlmin = require("gulp-htmlmin")
const del = require("del");
const autoprefixer = require("gulp-autoprefixer")
const browserSync = require("browser-sync")
const notify = require("gulp-notify")
const rename = require("gulp-rename")
const uglify = require("gulp-uglify")
const imagemin = require("gulp-imagemin")
const webp = require("gulp-webp")
const woff = require("gulp-ttf2woff")
const woff2 = require("gulp-ttf2woff2")
const {fontface} = require("./modules/fontface")




const html = () => {
  return src("src/html/index.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(dest("dist"))
};

const htmlminify = () => {
    return (
      src("src/html/index.html")
        .pipe(
          include({
            prefix: "@@",
          })
        )
        .pipe(dest("dist"))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest("dist"))
    )
}

const scss = () => {
    return src("src/scss/style.scss")
      .pipe(sass({ outputStyle: "expanded" }).on("error", notify.onError()))
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 5 versions"],
        })
      )
      .pipe(dest("dist/css"))
      .pipe(cssmin())
      .pipe(
        rename({
          suffix: ".min",
        })
      )
      .pipe(dest("dist/css"));
}

const js = () => {
    return src("src/js/script.js")
    .pipe(include())
    .pipe(dest("./dist/js"))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest("./dist/js"))
}

const images = () => {
    return src("./src/images/*/*.{jpg, jpeg, webp, gif, png}")
      .pipe(
        imagemin({
          progessive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimisationLevel: 3 /* 0 to 7 */,
        })
      )
      .pipe(
        webp({
          quality: 50
        })
      )
      .pipe(dest("dist/images"))
}

const icons = () => {
    return src("./src/icons/*.*")
      .pipe(dest("dist/icons"))
}

const fonts = () => {
      src("./src/fonts/*.ttf")
        .pipe(woff())
        .pipe(dest("dist/fonts"))
    return src("./src/fonts/*.ttf")
        .pipe(woff2())
        .pipe(dest("dist/fonts"))
}

const clean = () => {
    return del('dist')
}


const server = () => {
    browserSync.init({
        server: './dist',
        notify: false
    })
    watch('src/**/*.html', series(html)).on('change', browserSync.reload)
    watch('src/scss/**/*.scss', series(scss)).on('change', browserSync.reload)
    watch('src/js/**/*.js', series(js)).on('change', browserSync.reload)
    watch('src/images/**/*.*', series(images)).on('change', browserSync.reload)
    watch('src/icons/**/*.*', series(icons)).on('change', browserSync.reload)
    watch('src/fonts/*.ttf', series(fonts)).on("change", browserSync.reload)
    watch('src/fonts/*.ttf', series(fontface)).on("change", browserSync.reload)
}

exports.default = series(clean, parallel(html, scss, images, icons, js, fonts, fontface), server)
exports.build = series(clean, parallel(htmlminify, scss, images, icons, fonts, fontface, js))
exports.clean = clean
exports.fontface = fontface
