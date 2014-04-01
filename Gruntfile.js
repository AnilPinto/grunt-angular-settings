/*
 * grunt-angular-settings
 * 
 *
 * Copyright (c) 2014 Anil Pinto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        sampleInputDir: 'test/sample-input',
        tmpDir: 'tmp',

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },
        angularSettings: {
            options: {
                timestamp: '`A FEW SECONDS AGO`',
                postfix: 'Settings'
            },
            target: {
                settings: {
                    '<%= tmpDir %>/settings-1.js': [
                        '<%= sampleInputDir %>/settings-1*'
                    ],
                    '<%= tmpDir %>/settings-2.js': '<%= sampleInputDir %>/settings-2.json'
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint', 'clean', 'angularSettings', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
