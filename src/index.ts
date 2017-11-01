import path = require("path");
import Server = require("./server");
import env  = require("./env");
import del = require("del");
import uuidv4 = require("uuid/v4");
import buildTestProject = require("./buildTestProject");

/**
 * sometimes, we just want to run some js code in browsers and get results
 */

/**
 * options = {
 *   testDir,
 *   keep
 * }
 */
export = (jsCode: string, options: any = {}) => {
    options.testDir = path.resolve(options.testDir || ("__test_in_browser_env__" + uuidv4()));

    // build test project first
    return buildTestProject(jsCode, options).then(() => {
        const {
            start,
            setReceiveHandler
        } = Server(options);

        // run test server
        return start(options.port = 0).then(({
            address
        }) => {
            return new Promise((resolve) => {
                setReceiveHandler(resolve);

                // visit index html
                env(`http://127.0.0.1:${address.port}/index.html`, options);
            });
        });
    }).then((data) => {
        if (data.type === "error") {
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
