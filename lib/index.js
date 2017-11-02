"use strict";
const path = require("path");
const Server = require("./server");
const env = require("./env");
const del = require("del");
const uuidv4 = require("uuid/v4");
const buildTestProject = require("./buildTestProject");
module.exports = (jsCode, options = {}) => {
    const testDir = path.resolve(options.testDir || ("__test_in_browser_env__" + uuidv4()));
    // build test project first
    return buildTestProject(jsCode, testDir, options).then(() => {
        const { start, setReceiveHandler } = Server(testDir, options);
        // run test server
        return start(options.port = 0).then(({ address }) => {
            return new Promise((resolve) => {
                setReceiveHandler(resolve);
                // visit index html
                env(`http://127.0.0.1:${address.port}/index.html`, options);
            });
        });
    }).then((data) => {
        if (data.type === "error") {
            throw new Error(data.errorMsg);
        }
        else {
            return data.result;
        }
    }).then((data) => {
        // clean test project
        if (options.clean) {
            return del([testDir], {
                force: true
            }).then(() => {
                return data;
            });
        }
        return data;
    }).catch(err => {
        // clean test project
        if (options.clean) {
            return del([testDir], {
                force: true
            }).then(() => {
                throw err;
            });
        }
        throw err;
    });
};
//# sourceMappingURL=index.js.map