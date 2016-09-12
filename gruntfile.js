// Gruntfile.js
module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            all: ['public/app/**/*.js']
        },

        concat: {
            js: { 
                src: ['node_modules/angular/angular.js',
                    'node_modules/angular-route/angular-route.js',
                    'public/angular-app.js',
                    'public/dal.js',
                    'public/app/**/*.js'],
                dest: 'dist/js/code.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/js/code.min.js': ['dist/js/code.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'dist/style/site.css': 'style/site.scss'
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'dist/style/site.min.css': 'dist/style/site.css'
                }
            }
        },
        watch: {
            css: {
                files: ['style/site.scss'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['public/app/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify']
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'concat', 'uglify', 'concurrent']);

};