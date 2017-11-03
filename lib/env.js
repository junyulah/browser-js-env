"use strict";
const child_process_1 = require("child_process");
const template = require("lodash.template");
const isWindow = () => process.platform === "win32";
module.exports = (pageUrl, { open = undefined, openOptions = {}, appPath = undefined } = {}) => {
    if (typeof open === "function") {
        // when use open, it's better to provide a kill function
        return open(pageUrl);
    }
    else if (typeof open === "string") {
        const cmd = template(open)({ url: pageUrl });
        return child_process_1.exec(cmd);
    }
    else {
        // default
        return isWindow() ? child_process_1.spawn("start", [pageUrl], openOptions) : child_process_1.spawn("open", [pageUrl], openOptions);
    }
};
//# sourceMappingURL=env.js.map