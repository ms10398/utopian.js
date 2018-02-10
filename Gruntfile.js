module.exports = function(grunt) {
	grunt.initConfig({
		babel: {
		options: {
			sourceMap: false,
			presets: ['env']
		},
		dist: {
			files: {
				'dist/utopian.js': 'utopian.js'
			}
		}
		},
		uglify: {
			options: {
			  mangle: false
			},
			my_target: {
			  files: {
				'dist/utopian.min.js': ['dist/utopian.js']
			  }
			}
		}
	});
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['babel', 'uglify']);
}
