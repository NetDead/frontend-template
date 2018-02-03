import settings from '../settings';
import gulp from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpIf from 'gulp-if';
import yargs from 'yargs';

const PRODUCTION = !!(yargs.argv.production);

gulp.task('copy', () => (
	gulp.src(settings.resources)
		.pipe(changed('dist'))
		.pipe(gulpIf(PRODUCTION, filter(file => !/resources[\\\/]robots\.txt/.test(file.path)))) // Для продакшна не копируем robots.txt
		.pipe(gulpIf(!PRODUCTION, filter(file => !/resources[\\\/]\.htaccess/.test(file.path)))) // Для продакшна копируем .htaccess
		.pipe(gulp.dest('dist'))
));