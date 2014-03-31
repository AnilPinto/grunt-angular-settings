'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.angularSettings = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    generateSettings: function (test) {
        test.expect(2);

        var actual, expected;

        actual = grunt.file.read('tmp/settings-1.js');
        expected = grunt.file.read('test/expected-output/settings-1.js');
        test.equal(actual, expected, 'generates settings file as expected');


        actual = grunt.file.read('tmp/settings-2.js');
        expected = grunt.file.read('test/expected-output/settings-2.js');
        test.equal(actual, expected, 'generates settings file as expected');

        test.done();
    }
};
