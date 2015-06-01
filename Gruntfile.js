module.exports = function(grunt){
	'use strict';
	// Project configuration
	grunt.initConfig({
		jasmine: {
			src: 'public/js/**/*.js',
			options: {
				specs: 'specs/**/*.js',
				vendor: 'http://code.jquery.com/jquery-2.1.4.min.js'
			}
		},
		watch: {
			files: '**/*.js',
			tasks: ['jasmine']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
};