import path = require("path");
import promisify = require("es6-promisify");
import fs = require("fs");
import webpack = require("webpack");
import mkdir = require("mkdirp");

const mkdirp = promisify(mkdir);

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const PLAIN_HTML = path.join(__dirname, "../pageTpl/plain.html");
const INDEX_JS = path.join(__dirname, "../pageTpl/index.js");
const FAVICON = path.join(__dirname, "../pageTpl/favicon.ico");

export = async (jsCode: string, testDir: string, options) => {
    const htmlTplPath = options.htmlTplPath || PLAIN_HTML;
    const indexJsTplPath = options.indexJsTplPath || INDEX_JS;
    const faviconPath = options.faviconPath || FAVICON;

    const testHtmlPath = path.join(testDir, "index.html");
    const testIndexJsPath = path.join(testDir, "index.js");
    const testTestJsPath = path.join(testDir, "test.js");
    const testFaviconPath = path.join(testDir, "favicon.ico");

    await mkdirp(testDir);

    // copy html file, js file
    await Promise.all([
        copyFile(htmlTplPath, testHtmlPath),
        copyFile(indexJsTplPath, testIndexJsPath),
        copyFile(faviconPath, testFaviconPath)
    ]);

    // create test.js
    await writeFile(testTestJsPath, jsCode, "utf-8");

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
                } else {
                    resolve(stats);
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};

// TODO using stream to make it faster
const copyFile = async (srcFile: string, tarFile: string) => {
    const str = await readFile(srcFile, "utf-8");
    return writeFile(tarFile, str, "utf-8");
};
