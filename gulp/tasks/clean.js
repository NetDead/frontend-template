import settings from '../settings';
import gulp from 'gulp';
import del from 'del';

gulp.task('clean', () => del(settings.dest));

