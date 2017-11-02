'use strict';

let browserJsEnvTest = require('../..');
let assert = require('assert');

const {headlessOpen} = require('./util');

describe('apiPath', () => {
    it('fetch', () => {
        return browserJsEnvTest('module.exports = fetch("/api/test").then((response) => response.json())', {
            open: headlessOpen,
            apiMap: {
                '/api/test': (req, res) => {
                    res.end(JSON.stringify({
                        a: 1
                    }));
                }
            },
            clean: true
        }).then((ret) => {
            assert.deepEqual(ret, {
                a: 1
            });
        });
    });
});
