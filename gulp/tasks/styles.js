import settings from '../settings';
import gulp from 'gulp';
import reporter from 'postcss-reporter';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import mqpacker from 'css-mqpacker';
import rename from 'gulp-rename';
import gulpIf from 'gulp-if';
import cssnext from 'postcss-cssnext';
import stylelint from 'gulp-stylelint';
import easyImport from 'postcss-easy-import';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import yargs from 'yargs';

const PRODUCTION = !!(yargs.argv.production);

let postcss_plugins = [
	easyImport({
		path: 'lib'
	}),
	cssnext({
		browsers: 'last 2 versions, ie >= 10',
		features: {
			rem: false
		}
	}),
	reporter({ clearReportedMessages: true }), // Сообщения postcss
	mqpacker({ sort: true }) // Сортировка @media
];

if(PRODUCTION) {
	postcss_plugins.push(cssnano()); // Если продакшн - добавляем минифицирование стилей
}

gulp.task('styles', () => (
	gulp.src(settings.styles.main)
		.pipe(sourcemaps.init()) // Инициализация sourcemaps
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(postcss(postcss_plugins)) // Передаем на обработку postcss
		.pipe(gulpIf(PRODUCTION, sourcemaps.write())) // Если production - запись sourcemaps
		.pipe(rename({suffix: '.min'})) // Добавляем к файлу суффикс min
		.pipe(gulp.dest(settings.dest + '/assets/css'))
));

gulp.task('styles:lint', () => (
	gulp.src(`${settings.src}/blocks/**/*.css`, `!${settings.src}/styles/**/*.css`)
		.pipe(stylelint({
			failAfterError: false,
			reporters: [
				{formatter: 'string', console: true}
			]
		}))
));