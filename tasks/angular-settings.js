/*
 * grunt-angular-settings
 * 
 *
 * Copyright (c) 2014 Anil Pinto
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('angularSettings', 'Read settings.json and create a angular constant for each setting and save them in settings.js file.', function () {

        if(!isFileExist(this.data.options.settings)) {
            throw new TypeError('AngularSettings: \'settings\' is missing');
        }

        if(this.data.options.dest == null) {
            throw new TypeError('AngularSettings: \'dest\' is missing');
        }

        var settingsData = "",
            destFullFilepath = process.cwd() + "/" + this.data.options.dest,
            settingsFullFilepath = process.cwd() + "/" + this.data.options.settings,
            settingsJSON = grunt.file.readJSON(settingsFullFilepath);


            for(var key in settingsJSON) {
                settingsData += "angular.module('" + key + "').constant('" + key + "Settings', " + JSON.stringify(settingsJSON[key] , null, 4) + ");\n";
            }

            grunt.file.write(destFullFilepath,settingsData);
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
