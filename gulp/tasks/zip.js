import settings from '../settings';
import gulp from 'gulp';
import zip from 'gulp-zip';

const correctNumber = number => number < 10 ? '0' + number : number;

const getDateTime = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = correctNumber(now.getMonth() + 1);
	const day = correctNumber(now.getDate());
	const hours = correctNumber(now.getHours());
	const minutes = correctNumber(now.getMinutes());

	return `${year}-${month}-${day}-${hours}${minutes}`;
};

gulp.task('zip', () => (
	gulp.src([`${settings.dest}/**/*`, `!${settings.dest}/*.zip`])
		.pipe(zip(settings.dest + '.zip'))
		.pipe(gulp.dest(settings.dest))
));
