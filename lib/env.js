"use strict";
const child_process_1 = require("child_process");
const isWindow = () => process.platform === "win32";
module.exports = (pageUrl, { open = undefined, openOptions = {}, appPath = undefined } = {}) => {
    if (typeof open === "function") {
        return open(pageUrl);
    }
    else if (appPath) {
        return isWindow() ? child_process_1.spawn(appPath, [pageUrl], openOptions) : child_process_1.spawn("open", ["-a", appPath, pageUrl], openOptions);
    }
    else {
        // default
        return isWindow() ? child_process_1.spawn("start", [pageUrl], openOptions) : child_process_1.spawn("open", [pageUrl], openOptions);
    }
};
//# sourceMappingURL=env.js.map