'use strict';

module.exports = {
    entry: {
        app: ['./index.js']
    },
    output: {
        path: __dirname + '/asset',
        filename: '[name].js'
    }
};
