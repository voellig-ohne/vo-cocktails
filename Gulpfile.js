const gulp = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jade = require('gulp-jade');
const webserver = require('gulp-webserver');
const livereload = require('gulp-livereload');
const gutil = require('gulp-util');
const markdown = require('gulp-markdown-to-json');
const fs = require("fs");
const responsive = require('gulp-responsive');
const cssBase64 = require('gulp-css-base64');

const paths = require('./paths');
const vars = require('./vars');

gulp.task('script', () => {
	return gulp.src(paths.script)
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat(paths.dist.script))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dist.main))
    	.pipe(livereload());
});

gulp.task('style', ['copy-font'], () => {
	return gulp.src(paths.style.render)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(cssBase64())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist.main))
    	.pipe(livereload());
});

gulp.task('copy-font', () => {
	return gulp.src(paths.font)
		.pipe(gulp.dest(paths.dist.main + '/fonts'));
});

gulp.task('template', () => {
	return gulp.src(paths.template)
		.pipe(jade({
			locals: {
				vars: vars
			}
		}))
		.pipe(gulp.dest(paths.dist.main))
    	.pipe(livereload());
});

gulp.task('webserver', ['build', 'watch'], () => {
	gulp.src('./dist')
    	.pipe(webserver({
    		host: '0.0.0.0'
    	}));
});

gulp.task('watch', () => {
	livereload.listen();
	gulp.watch(paths.script, ['script']);
	gulp.watch(paths.style.watch, ['style']);
	gulp.watch(paths.template, ['template']);
});

gulp.task('build', ['script', 'style', 'template']);

gulp.task('watchweb', ['webserver']);

