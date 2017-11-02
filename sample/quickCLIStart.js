'use strict';

const path = require('path');

module.exports = {
    name: 'Quick CLI Example',
    samples: [{
        name: 'check cli options',
        directory: path.join(__dirname, './cli/options'),
        prepareCmd: 'npm i && npm update',
        runCmd: './node_modules/.bin/jsinbrowser -h'
    }, {
        name: 'cli quick start',
        directory: path.join(__dirname, './cli/options'),
        prepareCmd: 'npm i && npm update',
        runCmd: './node_modules/.bin/jsinbrowser -c "module.exports=document.title;"'
    }]
};
