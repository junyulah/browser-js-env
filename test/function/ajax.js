'use strict';

let browserJsEnvTest = require('../..');
let path = require('path');
let assert = require('assert');

describe('apiPath', () => {
    it('fetch', () => {
        return browserJsEnvTest('module.exports = fetch("/api/test").then((response) => response.json())', {
            testDir: path.join(__dirname, '../fixture/__test_dir__0'),
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
