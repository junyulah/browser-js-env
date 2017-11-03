"use strict";
const tslib_1 = require("tslib");
const path = require("path");
const Server = require("./server");
const env = require("./env");
const del = require("del");
const uuidv4 = require("uuid/v4");
const buildTestProject = require("./buildTestProject");
const clear = (testDir, browserProc) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // clean test project
    yield del([testDir], {
        force: true
    });
    if (browserProc && typeof browserProc.kill === "function") {
        browserProc.kill();
    }
});
module.exports = (jsCode, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const testDir = path.resolve(options.testDir || ("__test_in_browser_env__" + uuidv4()));
    let browserProc;
    try {
        yield buildTestProject(jsCode, testDir, options);
        // build test project first
        const { start, setReceiveHandler } = Server(testDir, options);
        const { address } = yield start(options.port = 0);
        // run test server and get data
        const data = yield new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            setReceiveHandler(resolve);
            // visit index html
            try {
                browserProc = yield env(`http://127.0.0.1:${address.port}/index.html`, options);
            }
            catch (err) {
                reject(err);
            }
        }));
        if (options.clean) {
            // clean test project
            yield clear(testDir, browserProc);
        }
        if (data.type === "error") {
            throw new Error(data.errorMsg);
        }
        else {
            return data.result;
        }
    }
    catch (err) {
        // clean test project
        yield clear(testDir, browserProc);
        throw err;
    }
});
//# sourceMappingURL=index.js.map