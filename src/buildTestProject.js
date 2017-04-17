'use strict';

let path = require('path');
let promisify = require('es6-promisify');
let fs = require('fs');
let spawnp = require('spawnp');

let mkdirp = promisify(require('mkdirp'));
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);

const PLAIN_HTML = path.join(__dirname, './pageTpl/plain.html');
const INDEX_JS = path.join(__dirname, './pageTpl/index.js');
const WEBPACK_CONFIG_JS = path.join(__dirname, './pageTpl/webpack.config.js');

let buildTestProject = (jsCode, options) => {
    let testDir = options.testDir;

    let htmlTplPath = options.htmlTplPath || PLAIN_HTML;
    let indexJsTplPath = options.indexJsTplPath || INDEX_JS;
    let webpackJsTplPath = options.webpackJsTplPath || WEBPACK_CONFIG_JS;

    const testHtmlPath = path.join(testDir, 'index.html');
    const testIndexJsPath = path.join(testDir, 'index.js');
    const testTestJsPath = path.join(testDir, 'test.js');
    const testWebpackConfigJsPath = path.join(testDir, 'webpack.config.js');

    return mkdirp(testDir).then(() => {
        // copy html file, js file
        return Promise.all([
            copyFile(htmlTplPath, testHtmlPath),
            copyFile(indexJsTplPath, testIndexJsPath),
            copyFile(webpackJsTplPath, testWebpackConfigJsPath)
        ]);
    }).then(() => {
        // create test.js
        return writeFile(testTestJsPath, jsCode, 'utf-8');
    }).then(() => {
        return spawnp('npm bin', [], null, {
            stdout: true
        }).then(({
            stdouts
        }) => {
            let binPath =stdouts.join('\n').trim();
            // building with webpack
            return spawnp(`${binPath}/webpack`, [], {
                cwd: testDir,
                path,
                stdio: options.displayPack ? 'inherit' : 'ignore'
            });

        });
    });
};

let copyFile = (srcFile, tarFile) => {
    return readFile(srcFile, 'utf-8').then((str) => {
        return writeFile(tarFile, str, 'utf-8');
    });
};

module.exports = buildTestProject;
