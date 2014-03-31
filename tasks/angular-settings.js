/*
 * grunt-angular-settings
 * 
 *
 * Copyright (c) 2014 Monitise Americas, Inc.
 * Licensed under the MIT license.
 */

'use strict';

var merge = require('deepmerge');

module.exports = function (grunt) {

    var description = 'Read settings.json and create a angular constant for each setting and save them in settings.js file.';

    grunt.registerMultiTask('angularSettings', description, function () {

        var multiTaskTargetConfigPath = this.name + '.' + this.target,
            settingsTargetConfigPath = multiTaskTargetConfigPath + '.settings',
            // set up defaults
            options = this.options({
                prefix: '',
                postfix: '',
                spacesIndent: 4,
                angularModuleName: 'ngSettings',
                angularMethod: 'constant',
                addTimestamp: true,
                timestamp: false
            }),
            template = grunt.file.read(__dirname + '/_settings.js.template'),
            targetOutputFile,
            templateData,
            inputFilePaths,
            inputFilePath,
            inputFiles,
            inputFile,
            inputJson,
            i, j,
            mergedJson,
            renderedTemplate;

        templateData = merge(options, this.data);

        grunt.verbose.writeln('Effective grunt settings for this pass are: ', templateData);

        this.requiresConfig(settingsTargetConfigPath);
        for (targetOutputFile in this.data.settings) {
            inputFilePaths = this.data.settings[targetOutputFile];
            grunt.verbose.writeln('Building settings data for target ouput file ' + targetOutputFile + ' from sources: ', inputFilePaths);
            if ('array' !== grunt.util.kindOf(inputFilePaths)) {
                grunt.verbose.write('Source paths for ' + targetOutputFile + ' specified as string; converting to array...');
                inputFilePaths = [ inputFilePaths ];
                grunt.verbose.ok();
            }
            mergedJson = {};
            for (i = 0; i < inputFilePaths.length; i++) {
                inputFilePath = inputFilePaths[i];
                inputFiles = grunt.file.expand(inputFilePath);
                if (!inputFiles.length) {
                    grunt.verbose.warn('No files found for path: ', inputFilePath);
                    continue;
                }
                for (j = 0; j < inputFiles.length; j++) {
                    inputFile = inputFiles[j];
                    inputJson = grunt.file.readJSON(inputFile);
                    mergedJson = merge(mergedJson, inputJson);
                }
            }

            templateData.settingsBlocks = mergedJson;
            grunt.verbose.writeln('Building JS file from template using data...', templateData);
            renderedTemplate = grunt.template.process(template, {
                data: templateData
            });
            grunt.verbose.ok();

            grunt.file.write(targetOutputFile, renderedTemplate);
        }
    });
};
