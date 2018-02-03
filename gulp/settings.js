module.exports = {
	domain: 'template',
	src: 'app',
	dest: 'dist',
	pages: 'app/pages/*.pug',
	templates: 'app/blocks/**/*.pug',
	bundle: [
		'lib/jquery/dist/jquery.min.js',
		'lib/js-cookie/src/js.cookie.js',
		'lib/fancyBox/dist/jquery.fancybox.min.js',
		'lib/svg4everybody/dist/svg4everybody.min.js'
	],
	scripts: [
		'app/blocks/**/*.js',
		'app/scripts/!(app).js',
		'app/scripts/app.js'
	],
	styles: {
		main: 'app/styles/app.css',
		all: [
			'app/blocks/**/*.css',
			'app/styles/**/*.css'
		]
	},
	svg: 'app/svg-icons/**/*.svg',
	images: 'app/images/**/*',
	resources: [
		'app/resources/**/*',
		'app/resources/.htaccess'
	]
}