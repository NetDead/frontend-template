import settings from '../settings';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import prettify from 'gulp-jsbeautifier';
import rename from 'gulp-rename';
import yargs from 'yargs';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';

const PRODUCTION = !!(yargs.argv.production);

gulp.task('templates', () => (
	gulp.src(settings.pages)
		.pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
		.pipe(pug({
			basedir: settings.src,
			pretty: true,
			doctype: 'strict'
		}))
		.pipe(gulpIf(PRODUCTION, prettify({
			brace_style: 'expand',
			indent_with_tabs: true,
			indent_inner_html: true,
			preserve_newlines: true,
			end_with_newline: true,
			wrap_line_length: 120,
			max_preserve_newlines: 50,
			wrap_attributes_indent_size: 1,
			unformatted: ['use']
		})))
		.pipe(rename({
			extname: '.php'
		}))
		.pipe(gulp.dest(settings.dest))
));

gulp.task('templates:lint', () => (
	gulp.src([settings.pages, settings.templates])
		.pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
		.pipe(pugLinter())
		.pipe(pugLinter.reporter('fail'))
));