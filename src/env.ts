'use strict';

import { spawn } from 'child_process';

/**
 * TODO support window
 * TODO support any browser
 */
export = (pageUrl, {
    appPath = ''
} = {}) => {
    if (appPath) {
        return isWindow() ? spawn(appPath, [pageUrl]) : spawn('open', ['-a', appPath, pageUrl]);
    }
    return isWindow() ? spawn('start', [pageUrl]) : spawn('open', [pageUrl]);
};

let isWindow = () => process.platform === 'win32';
