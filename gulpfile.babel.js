import gulp from 'gulp';
require('require-dir')('./gulp/tasks', {recurse: true});

gulp.task('dependencies', gulp.series(
	'clean',
	'scripts:bundle',
	'svgSprite',
	gulp.parallel(
		'images',
		'templates',
		'templates:lint',
		'styles',
		'styles:lint',
		'scripts',
		'copy'
	)
));

gulp.task('default', gulp.series('dependencies', 'server', 'watch'));
gulp.task('build', gulp.series('dependencies', 'zip'));