import settings from '../settings';
import gulp from 'gulp';
import { get as browserSync } from 'browser-sync';
const bs = browserSync('server');

gulp.task('watch', () => {
	gulp.watch([settings.styles.main, settings.styles.all]).on('all', gulp.series('styles', bs.reload));
	gulp.watch([settings.styles.main, settings.styles.all]).on('all', gulp.series('styles:lint'));
	gulp.watch(settings.src + '/**/*.pug').on('all', gulp.series('templates', bs.reload));
	gulp.watch(settings.src + '/**/*.pug').on('all', gulp.series('templates:lint'));
	gulp.watch(settings.bundle).on('all', gulp.series('scripts:bundle', bs.reload));
	gulp.watch(settings.scripts).on('all', gulp.series('scripts', bs.reload));
	gulp.watch(settings.svg).on('all', gulp.series('svgSprite', bs.reload));
	gulp.watch(settings.images).on('all', gulp.series('images', bs.reload));
	gulp.watch(settings.resources).on('all', gulp.series('copy', bs.reload));
});