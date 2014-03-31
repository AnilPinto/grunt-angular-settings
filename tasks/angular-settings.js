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
        this.requiresConfig(settingsTargetConfigPath);
        for (targetOutputFile in this.data.settings) {
            inputFilePaths = this.data.settings[targetOutputFile];
            if ('array' !== grunt.util.kindOf(inputFilePaths)) {
                inputFilePaths = [ inputFilePaths ];
            }
            mergedJson = {};
            for (i = 0; i < inputFilePaths.length; i++) {
                inputFilePath = inputFilePaths[i];
                inputFiles = grunt.file.expand(inputFilePath);
                for (j = 0; j < inputFiles.length; j++) {
                    inputFile = inputFiles[j];
                    inputJson = grunt.file.readJSON(inputFile);
                    mergedJson = merge(mergedJson, inputJson);
                }
            }

            templateData.settingsBlocks = mergedJson;
            renderedTemplate = grunt.template.process(template, {
                data: templateData
            });

            grunt.file.write(targetOutputFile, renderedTemplate);
        }
    });
};
