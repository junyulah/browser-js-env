'use strict';

let {
    spawn
} = require('child_process');

/**
 * TODO support window
 * TODO support any browser
 */
module.exports = (pageUrl) => {
    return spawn('open', [pageUrl]);
};
