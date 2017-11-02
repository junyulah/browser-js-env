import { spawn } from "child_process";

/**
 * TODO support window
 * TODO support any browser
 */
export = (pageUrl: string, {
    open = undefined,
    openOptions = {},
    appPath = undefined
} = {}) => {
    if (typeof open === "function") {
       return open(pageUrl);
    } else if (appPath) {
        return isWindow() ? spawn(appPath, [pageUrl], openOptions) : spawn("open", ["-a", appPath, pageUrl], openOptions);
    } else {
        // default
        return isWindow() ? spawn("start", [pageUrl], openOptions) : spawn("open", [pageUrl], openOptions);
    }
};

const isWindow = () => process.platform === "win32";
