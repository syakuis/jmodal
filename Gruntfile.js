module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        uglify: {
            target: {
                files: {
                    'dist/jquery.syaku.modal.min.js': ['src/jquery.syaku.modal.js']
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/jquery.syaku.modal.min.css': ['src/jquery.syaku.modal.css']
                }
            }

        }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', [
		'cssmin',
		'uglify'
	]);
};