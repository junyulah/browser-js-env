"use strict";
const tslib_1 = require("tslib");
const path = require("path");
const Server = require("./server");
const env = require("./env");
const del = require("del");
const uuidv4 = require("uuid/v4");
const buildTestProject = require("./buildTestProject");
const clear = (testDir, browser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    // clean test project
    yield del([testDir], {
        force: true
    });
    if (browser && typeof browser.kill === "function") {
        yield browser.kill();
    }
});
module.exports = (jsCode, options = {}) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const testDir = path.resolve(options.testDir || ("__test_in_browser_env__" + uuidv4()));
    let browser;
    try {
        yield buildTestProject(jsCode, testDir, options);
        // build test project first
        const { start, receiveData } = Server(testDir, options);
        const { address } = yield start(options.port = 0);
        const ret = yield Promise.all([
            receiveData(),
            env(`http://127.0.0.1:${address.port}/index.html`, options)
        ]);
        const data = ret[0];
        browser = ret[1];
        if (data.type === "error") {
            throw new Error(data.errorMsg);
        }
        if (options.clean) {
            // clean test project
            yield clear(testDir, browser);
        }
        return data.result;
    }
    catch (err) {
        if (options.clean) {
            // clean test project
            yield clear(testDir, browser);
        }
        throw err;
    }
});
//# sourceMappingURL=index.js.map