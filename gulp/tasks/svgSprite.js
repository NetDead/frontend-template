import settings from '../settings';
import gulp from 'gulp';
import svgSymbols from 'gulp-svg-symbols';
import svgmin from 'gulp-svgmin';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import path from 'path';

gulp.task('svgSprite', () => (
	gulp.src(settings.svg)
		.pipe(plumber({errorHandler: errorHandler(`Error in \'icons\' task`)}))
		.pipe(svgmin({
			js2svg: {
				pretty: true
			},
			plugins: [
				{removeTitle: true},
				{removeUnknownsAndDefaults: true},
				{removeDimensions: true},
				{addClassesToSVGElement: {
					className: 'visuallyhidden'
				}},
				{removeAttrs: {
					attrs: '(fill|stroke|class|id|style|preserveAspectRatio|fill-rule)'
				}}
			]
		}))
		.pipe(svgSymbols({
			title: false,
			id: '%f',
			className: 'icon_%f',
			templates: [
				path.join(__dirname, `../../${settings.src}/svg-icons/svg-size.css`),
				'default-svg'
			]
		}))
		.pipe(gulpIf(/\.css$/, gulp.dest(settings.src + '/styles/helpers')))
		.pipe(gulpIf(/\.svg$/, rename('icon.svg')))
		.pipe(gulpIf(/\.svg$/, gulp.dest(settings.dest + '/assets/img')))
));
