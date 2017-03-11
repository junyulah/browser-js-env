'use strict';

let browserJsEnvTest = require('../..');
let path = require('path');
let assert = require('assert');

describe('index', () => {
    it('base', () => {
        return browserJsEnvTest('module.exports = 1 + 1', {
            testDir: path.join(__dirname, '../fixture/__test_dir__0')
        }).then((ret) => {
            assert.equal(ret, 2);
        });
    });

    it('string', () => {
        return browserJsEnvTest('module.exports = "hello"', {
            testDir: path.join(__dirname, '../fixture/__test_dir__1')
        }).then((ret) => {
            assert.equal(ret, 'hello');
        });
    });
});
