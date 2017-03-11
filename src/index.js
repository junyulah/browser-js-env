'use strict';

let path = require('path');
let Server = require('./server');
let env = require('./env');

let buildTestProject = require('./buildTestProject');

/**
 * sometimes, we just want to run some js code in browsers and get results
 *
 * 1. create a simple page which include our js code
 *
 * 2. open this simple page and run js code and get results to our node process
 */

/**
 * options = {
 *   testDir,
 *   keep
 * }
 */
module.exports = (jsCode, options = {}) => {
    options.testDir = path.resolve(options.testDir || '__test_in_browser_env__');

    return buildTestProject(jsCode, options).then(() => {
        let {
            start, setReceiveHandler
        } = Server(options);

        return start().then(({
            address
        }) => {
            return new Promise((resolve) => {
                setReceiveHandler((data) => {
                    resolve(data);
                });

                // visit index html
                env(`http://127.0.0.1:${address.port}/index.html`);
            });
        });
    }).then((data) => {
        if (data.type === 'error') {
            throw new Error(data.errorMasg);
        } else {
            return data.result;
        }
    });
};
