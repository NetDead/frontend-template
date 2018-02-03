import settings from '../settings';
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import yargs from 'yargs';

const PRODUCTION = !!(yargs.argv.production);

gulp.task('scripts', () => (
	gulp.src(settings.scripts)
		.pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
		.pipe(concat('app.min.js')) // Конкатенируем все скрипты
		.pipe(gulpIf(PRODUCTION, uglify())) // Если продакшн - минифицируем
		.pipe(gulp.dest(settings.dest + '/assets/js'))
));

gulp.task('scripts:bundle', () => (
	gulp.src(settings.bundle)
		.pipe(plumber({errorHandler: errorHandler(`Error in \'scripts:bundle\' task`)}))
		.pipe(concat('bundle.js')) // Собираем все вендорные скрипты в один файл
		.pipe(uglify()) // Минифицируем
		.pipe(gulp.dest(settings.src + '/scripts'))
));
