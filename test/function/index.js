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

    it('webpack-require', () => {
        let p = path.join(__dirname, '../fixture/webpackRequire/index.js');

        return browserJsEnvTest(`module.exports = require("${p}")`, {
            testDir: path.join(__dirname, '../fixture/__test_dir__2')
        }).then((ret) => {
            assert.equal(ret, 6);
        });
    });

    it('require test code exception', () => {
        return browserJsEnvTest('throw new Error("on purpose")', {
            testDir: path.join(__dirname, '../fixture/__test_dir__3')
        }).catch(err => {
            assert.equal(err.toString().indexOf('on purpose') !== -1, true);
        });
    });
});
