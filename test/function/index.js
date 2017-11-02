'use strict';

const browserJsEnvTest = require('../..');
const path = require('path');
const assert = require('assert');

const {headlessOpen} = require('./util');

describe('index', () => {
    it('base', () => {
        return browserJsEnvTest('module.exports = 1 + 1', {
            clean: true,
            open: headlessOpen
        }).then((ret) => {
            assert.equal(ret, 2);
        });
    });

    it('string', () => {
        return browserJsEnvTest('module.exports = "hello"', {
            clean: true,
            open: headlessOpen
        }).then((ret) => {
            assert.equal(ret, 'hello');
        });
    });

    it('webpack-require', () => {
        let p = path.join(__dirname, '../fixture/webpackRequire/index.js');

        return browserJsEnvTest(`module.exports = require("${p}")`, {
            clean: true,
            open: headlessOpen
        }).then((ret) => {
            assert.equal(ret, 6);
        });
    });

    it('require test code exception', () => {
        return browserJsEnvTest('throw new Error("on purpose")', {
            testDir: path.join(__dirname, '../fixture/__test_dir__3'),
            clean: true,
            open: headlessOpen
        }).catch(err => {
            assert.equal(err.toString().indexOf('on purpose') !== -1, true);
        });
    });

    it('refer document', () => {
        return browserJsEnvTest('module.exports = document.title', {
            clean: true,
            open: headlessOpen
        }).then((ret) => {
            assert.equal(ret, 'browser-js-env:test');
        });
    });

    it('log', () => {
        // TODO assertion
        return browserJsEnvTest('console.log(123)', {
            clean: true,
            open: headlessOpen
        });
    });

    it('async resolve', () => {
        // TODO assertion
        return browserJsEnvTest('module.exports=new Promise((resolve) => {setTimeout(() => {resolve(12)}, 50)})', {
            testDir: path.join(__dirname, '../fixture/__test_dir__1'),
            clean: true,
            open: headlessOpen
        }).then((ret) => {
            assert.equal(ret, 12);
        });
    });

    it('async reject', (done) => {
        browserJsEnvTest('module.exports=new Promise((resolve, reject) => {setTimeout(()=>{reject(new Error("err 123"))}, 50)})', {
            clean: true,
            open: headlessOpen
        }).catch(err => {
            assert.equal(err.toString().indexOf('err 123') !== -1, true);
            done();
        });
    });

    it('different browser', () => {
        return browserJsEnvTest('module.exports = document.title', {
            testDir: path.join(__dirname, '../fixture/__test_dir__1'),
            clean: true,
            open: 'open -a /Applications/Safari.app <%=url%>'
        }).then((ret) => {
            assert.equal(ret, 'browser-js-env:test');
        });
    });
});
