"use strict";
const tslib_1 = require("tslib");
const path = require("path");
const promisify = require("es6-promisify");
const fs = require("fs");
const webpack = require("webpack");
const mkdir = require("mkdirp");
const mkdirp = promisify(mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const PLAIN_HTML = path.join(__dirname, "../pageTpl/plain.html");
const INDEX_JS = path.join(__dirname, "../pageTpl/index.js");
const FAVICON = path.join(__dirname, "../pageTpl/favicon.ico");
// TODO using stream to make it faster
const copyFile = (srcFile, tarFile) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const str = yield readFile(srcFile, "utf-8");
    return writeFile(tarFile, str, "utf-8");
});
module.exports = (jsCode, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const testDir = options.testDir;
    const htmlTplPath = options.htmlTplPath || PLAIN_HTML;
    const indexJsTplPath = options.indexJsTplPath || INDEX_JS;
    const faviconPath = options.faviconPath || FAVICON;
    const testHtmlPath = path.join(testDir, "index.html");
    const testIndexJsPath = path.join(testDir, "index.js");
    const testTestJsPath = path.join(testDir, "test.js");
    const testFaviconPath = path.join(testDir, "favicon.ico");
    yield mkdirp(testDir);
    // copy html file, js file
    yield Promise.all([
        copyFile(htmlTplPath, testHtmlPath),
        copyFile(indexJsTplPath, testIndexJsPath),
        copyFile(faviconPath, testFaviconPath)
    ]);
    // create test.js
    yield writeFile(testTestJsPath, jsCode, "utf-8");
    const compiler = webpack({
        entry: {
            app: [path.join(testDir, "./index.js")]
        },
        output: {
            path: path.join(testDir, "/asset"),
            filename: "[name].js"
        }
    });
    return new Promise((resolve, reject) => {
        try {
            compiler.run((err, stats) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(stats);
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
});
//# sourceMappingURL=buildTestProject.js.map