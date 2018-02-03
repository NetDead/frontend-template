import settings from '../settings';
import gulp from 'gulp';
import changed from 'gulp-changed';
import gulpIf from 'gulp-if';
import imagemin from 'gulp-imagemin';
import optimizeJpg from 'imagemin-jpegoptim';
import optimizePng from 'imagemin-pngquant';
import optimizeSvg from 'imagemin-svgo';
import yargs from 'yargs';

const PRODUCTION = !!(yargs.argv.production);

gulp.task('images', () => (
	gulp.src(settings.images)
		.pipe(changed(settings.dest + '/assets/img')) // Только новые картинки
		.pipe(imagemin([ // Для production оптимизация изображений
			optimizeJpg({ // Оптимизация JPG
				progressive: true, // Прогрессивная загрузка
				max: 88 // Уровень качества, подходящий для Google Page Speed
			}),
			optimizePng(), // Оптимизация PNG
			optimizeSvg({
				js2svg: {
					pretty: true
				},
				plugins: [
					{removeTitle: true},
					{removeUnknownsAndDefaults: true},
					{removeDimensions: true},
					{removeAttrs: {
						attrs: '(class|id|style|preserveAspectRatio|fill-rule)'
					}}
				]
			})
		],{verbose: true})) // Отчёты
		.pipe(gulp.dest(settings.dest + '/assets/img'))
));