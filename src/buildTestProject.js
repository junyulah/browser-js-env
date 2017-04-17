'use strict';

let path = require('path');
let promisify = require('es6-promisify');
let fs = require('fs');
let webpack = require('webpack');

let mkdirp = promisify(require('mkdirp'));
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);

const PLAIN_HTML = path.join(__dirname, './pageTpl/plain.html');
const INDEX_JS = path.join(__dirname, './pageTpl/index.js');

let buildTestProject = (jsCode, options) => {
    let testDir = options.testDir;

    let htmlTplPath = options.htmlTplPath || PLAIN_HTML;
    let indexJsTplPath = options.indexJsTplPath || INDEX_JS;

    const testHtmlPath = path.join(testDir, 'index.html');
    const testIndexJsPath = path.join(testDir, 'index.js');
    const testTestJsPath = path.join(testDir, 'test.js');

    return mkdirp(testDir).then(() => {
        // copy html file, js file
        return Promise.all([
            copyFile(htmlTplPath, testHtmlPath),
            copyFile(indexJsTplPath, testIndexJsPath)
        ]);
    }).then(() => {
        // create test.js
        return writeFile(testTestJsPath, jsCode, 'utf-8');
    }).then(() => {
        let compiler = webpack({
            entry: {
                app: [path.join(testDir, './index.js')]
            },
            output: {
                path: path.join(testDir, '/asset'),
                filename: '[name].js'
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
    });
};

let copyFile = (srcFile, tarFile) => {
    return readFile(srcFile, 'utf-8').then((str) => {
        return writeFile(tarFile, str, 'utf-8');
    });
};

module.exports = buildTestProject;
