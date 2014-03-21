/*
 * grunt-angular-settings
 * 
 *
 * Copyright (c) 2014 Anil Pinto
 * Licensed under the MIT license.
 */

'use strict';
var jsonSettingsSchema = require('json-settings-schema');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('angularSettings', 'Read settings-schema.json and settings.json files, validate them json-settings-schema and then create a angular constant for each setting and save them in settings.js file.', function () {

        if(!isFileExist(this.data.options.schema)) {
            throw new TypeError('AngularSettings: \'schema\' is missing');
        }

        if(this.data.options.dest == null) {
            throw new TypeError('AngularSettings: \'dest\' is missing');
        }

        var settingsData = "",
            settingsOverrides = null,
            destFullFilepath = process.cwd() + "/" + this.data.options.dest,
            schemaFullFilepath = process.cwd() + "/" + this.data.options.schema,
            schema = grunt.file.readJSON(schemaFullFilepath);


        if(isFileExist(this.data.options.settings)) {
            var filepath = process.cwd() + "/" + this.data.options.settings;
            settingsOverrides = grunt.file.readJSON(filepath);
        }

        jsonSettingsSchema.buildSettings(settingsOverrides, schema, function (err, settings) {

            if(err) {
                throw err;
            }

            for(var key in settings) {
                settingsData += "angular.module('" + key + "').constant('" + key + "Settings', " + JSON.stringify(settings[key] , null, 4) + ");\n";
            }

            grunt.file.write(destFullFilepath,settingsData);
        });
    });

    /**
     * If parameter is not null then prepend the cwd and check if file exist.
     * If exist then return true else false.
     * @param filepath
     * @returns {boolean}
     */
    function isFileExist(filepath) {
        if(filepath== null ) {
            return false;
        }

        var fullFilepath = process.cwd() + "/" + filepath;
        return grunt.file.exists(fullFilepath);
    }
};
