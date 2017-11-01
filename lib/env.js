'use strict';
const child_process_1 = require("child_process");
let isWindow = () => process.platform === 'win32';
module.exports = (pageUrl, { appPath = '' } = {}) => {
    if (appPath) {
        return isWindow() ? child_process_1.spawn(appPath, [pageUrl]) : child_process_1.spawn('open', ['-a', appPath, pageUrl]);
    }
    return isWindow() ? child_process_1.spawn('start', [pageUrl]) : child_process_1.spawn('open', [pageUrl]);
};
//# sourceMappingURL=env.js.map