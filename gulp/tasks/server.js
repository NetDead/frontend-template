import settings from '../settings';
import { create as browserSync } from 'browser-sync';
import gulp from 'gulp';

const bs = browserSync('server');

gulp.task('server', (done) => {
	bs.init({
		files: [settings.dest + '/**/*'],
		open: 'local',
		notify: false,
		reloadOnRestart: true,
		port: 3000,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		},
		/*server: {
			baseDir: settings.dest,
			directory: false
		},*/
		proxy: {
			target: 'http://' + settings.domain + '/' + settings.dest
		}

	});
	done();
});