import { spawn } from "child_process";

/**
 * TODO support window
 * TODO support any browser
 */
export = (pageUrl: string, {
    appPath = ""
} = {}) => {
    if (appPath) {
        return isWindow() ? spawn(appPath, [pageUrl]) : spawn("open", ["-a", appPath, pageUrl]);
    }
    return isWindow() ? spawn("start", [pageUrl]) : spawn("open", [pageUrl]);
};

const isWindow = () => process.platform === "win32";
