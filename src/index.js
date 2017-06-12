'use strict';

let path = require('path');
let Server = require('./server');
let env = require('./env');
let del = require('del');

let buildTestProject = require('./buildTestProject');

/**
 * sometimes, we just want to run some js code in browsers and get results
 */

/**
 * options = {
 *   testDir,
 *   keep
 * }
 */
module.exports = (jsCode, options = {}) => {
    options.testDir = path.resolve(options.testDir || '__test_in_browser_env__');

    // build test project first
    return buildTestProject(jsCode, options).then(() => {
        let {
            start, setReceiveHandler
        } = Server(options);

        // run test server
        return start(options.port = 0).then(({
            address
        }) => {
            return new Promise((resolve) => {
                setReceiveHandler((data) => {
                    resolve(data);
                });

                // visit index html
                env(`http://127.0.0.1:${address.port}/index.html`, options);
            });
        });
    }).then((data) => {
        if (data.type === 'error') {
            throw new Error(data.errorMsg);
        } else {
            return data.result;
        }
    }).then((data) => {
        // clean test project
        if (options.clean) {
            return del([options.testDir], {
                force: true
            }).then(() => {
                return data;
            });
        }

        return data;
    }).catch(err => {
        // clean test project
        if (options.clean) {
            return del([options.testDir], {
                force: true
            }).then(() => {
                throw err;
            });
        }
        throw err;
    });
};
