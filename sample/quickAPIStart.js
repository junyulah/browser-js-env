const path = require('path');

module.exports = {
    name: 'Quick API Example',
    samples: [{
        name: 'quick run',
        directory: path.join(__dirname, './api/quickStart'),
        prepareCmd: 'npm i && npm update',
        runCmd: 'node test.js',

        display: {
            beforeRun: {
                files: [{
                    target: path.join(__dirname, './api/quickStart/test.js')
                }]
            }
        }
    }, {
        name: 'support promise',
        directory: path.join(__dirname, './api/supportPromise'),
        prepareCmd: 'npm i && npm update',
        runCmd: 'node test.js',

        display: {
            beforeRun: {
                files: [{
                    target: path.join(__dirname, './api/supportPromise/test.js')
                }]
            }
        }
    }, {
        name: 'support commonJs (by using webpack)',
        directory: path.join(__dirname, './api/commonJs'),
        prepareCmd: 'npm i && npm update',
        runCmd: 'node test.js',

        display: {
            beforeRun: {
                files: [{
                    target: path.join(__dirname, './api/commonJs/test.js')
                }]
            }
        }
    }, {
        name: 'try using safari as a browser',
        directory: path.join(__dirname, './api/appPath'),
        prepareCmd: 'npm i && npm update',
        runCmd: 'node test.js',

        display: {
            beforeRun: {
                files: [{
                    target: path.join(__dirname, './api/appPath/test.js')
                }]
            }
        }
    }, {
        name: 'try using electron as a browser',
        directory: path.join(__dirname, './api/electron'),
        // prepareCmd: 'ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/ npm i && npm update',
        runCmd: 'node test.js',

        display: {
            beforeRun: {
                files: [{
                    target: path.join(__dirname, './api/appPath/test.js')
                }]
            }
        }
    }, {
        name: 'try using headless chrome',
        directory: path.join(__dirname, './api/chromeHeadless'),
        prepareCmd: 'npm i && npm update',
        runCmd: 'node test.js',

        display: {
            beforeRun: {
                files: [{
                    target: path.join(__dirname, './api/appPath/test.js')
                }]
            }
        }
    }]
};
