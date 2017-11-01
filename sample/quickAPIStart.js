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
        name: 'run js code in difference browser, just configure appPath',
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
    }]
};
