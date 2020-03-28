const { src, dest, series, watch } = require('gulp');
const path = require('path');
const plumber = require('gulp-plumber');
const del = require('del');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');
const prettify = require('gulp-html-prettify');
const webpackStream = require('webpack-stream');
const mqpacker = require("css-mqpacker");
const webp = require('gulp-webp');
const cheerio = require('gulp-cheerio');
const cleanSvg   = require('gulp-cheerio-clean-svg');
const replace = require('gulp-replace');

let isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

function html() {
	let svgs = src('src/icons/*.svg')
		.pipe(svgmin(function (file) {
		let prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [{
					cleanupIDs: {
						prefix: prefix + '-',
						minify: true
					}
				}]
			}
		}))
		.pipe(cheerio(cleanSvg({
			removeSketchType: true,
			removeEmptyGroup: true,
			removeEmptyDefs: true,
			removeEmptyLines: true,
			removeComments: true,
			tags: ["title", "desc"],
			attributes: ["id", "style", "fill*", "clip*", "stroke*", "mask", "opacity", "width", "height", "transform"]
		})))
		.pipe(src('src/icons-no-ch/*.svg'))
		.pipe(replace("&gt;", ">"))
		.pipe(svgstore({ inlineSvg: true }));

		function fileContents (filePath, file) {
				return file.contents.toString();
		}

		return src('src/pages/index.html')
			.pipe(plumber())
			.pipe(inject(svgs, { transform: fileContents }))
			.pipe(posthtml([include()]))
			.pipe(gulpIf(isDev, prettify({ indent_char: '	', indent_size: 1 })))
			.pipe(dest('build/'));
}

function css() {
  return src('src/styles/styles.scss')
    .pipe(plumber())
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss([ autoprefixer(), mqpacker() ]))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}

function js() {
	return src('src/js/main.js')
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
			mode: isDev ? 'development' : 'production',
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    }))
    .pipe(dest('build/js'));
}

function imgOpt() {
  return src('src/img/**/*.{jpg,jpeg,png,gif,svg}')
    .pipe(plumber())
    .pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 90, progressive: true }),
			imagemin.optipng({ optimizationLevel: 4 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: false },
					{ cleanupIDs: false },
					{ removeDimensions: true }
				]
			})
    ]))
    .pipe(dest('src/img'))
}

function webpImg() {
	return src(['src/img/**/*.{jpg,jpeg,png,gif}', '!src/img/icons/*.*', '!src/img/webp/*.*'])
		.pipe(plumber())
		.pipe(webp({
			quality: 100
		}))
		.pipe(dest('src/img/webp'))
}

function copyImg() {
	return src(['src/img/**/*.{jpg,jpeg,png,webp,svg}', '!src/img/icons'])
		.pipe(dest('build/img'));
}

function copy() {
  return src('src/assets/**/*.*')
    .pipe(dest('build'));
}

function server() {
  browserSync.init({
    server: {
        baseDir: 'build'
    },
    notify: false
  });

  watch("src/pages/**/*.html", series(html, refreshPage));
  watch("src/styles/**/*.scss", series(css, refreshPage));
  watch("src/js/**/*.js", series(js, refreshPage));
}

function clean() {
  return del('build');
}

function refreshPage(done) {
  browserSync.reload();
  done();
}

function build(done) {
	copyImg();
	html();
  copy();
  js();
  css();
  done();
}

exports.start = series(clean, build, server);
exports.build = series(clean, build);
exports.clean = clean;
exports.imageopt = series(webpImg, imgOpt);
