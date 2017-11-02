"use strict";
const crudeServer = require("crude-server");
const path = require("path");
const mime = require("mime-types");
const fs_1 = require("fs");
module.exports = (testDir, { keep, apiMap = {}, reportPath = "/__api/__reportData", logPath = "/__api/__log" }) => {
    let receiveHandler;
    const setReceiveHandler = (handler) => {
        receiveHandler = handler;
    };
    const { start, stop } = crudeServer((pathname) => {
        if (pathname === reportPath) {
            return (req, res) => {
                let str = "";
                req.on("data", (chunk) => {
                    str += chunk.toString();
                });
                req.on("end", () => {
                    const data = JSON.parse(str);
                    res.end(JSON.stringify({
                        errNo: 0,
                        keep
                    }));
                    stop().then(() => {
                        receiveHandler && receiveHandler(data);
                    });
                });
            };
        }
        else if (pathname === logPath) {
            return (req, res) => {
                let str = "";
                req.on("data", (chunk) => {
                    str += chunk.toString();
                });
                req.on("end", () => {
                    const args = JSON.parse(str);
                    res.end(JSON.stringify({
                        errNo: 0
                    }));
                    console.log(...args); // eslint-disable-line
                });
            };
        }
        else if (apiMap[pathname]) {
            return apiMap[pathname];
        }
        else {
            return (req, res) => {
                res.setHeader("Content-Type", mime.lookup(pathname));
                fs_1.createReadStream(path.join(testDir, pathname.substring(1))).pipe(res);
            };
        }
    });
    return {
        start, setReceiveHandler
    };
};
//# sourceMappingURL=server.js.map