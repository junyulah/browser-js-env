'use strict';

let crudeServer = require('crude-server');
let path = require('path');
let mime = require('mime-types');
let {
    createReadStream
} = require('fs');

module.exports = ({
    testDir,
    keep,
    reportPath = '/__api/__reportData', logPath = '/__api/__log'
}) => {
    let receiveHandler = null;

    let setReceiveHandler = (handler) => {
        receiveHandler = handler;
    };

    let {
        start, stop
    } = crudeServer((pathname) => {
        if (pathname === reportPath) {
            return (req, res) => {
                let str = '';
                req.on('data', (chunk) => {
                    str += chunk.toString();
                });

                req.on('end', () => {
                    let data = JSON.parse(str);

                    res.end(JSON.stringify({
                        errNo: 0,
                        keep
                    }));

                    stop().then(() => {
                        receiveHandler && receiveHandler(data);
                    });
                });
            };
        } else if (pathname === logPath) {
            return (req, res) => {
                let str = '';
                req.on('data', (chunk) => {
                    str += chunk.toString();
                });

                req.on('end', () => {
                    let args = JSON.parse(str);

                    res.end(JSON.stringify({
                        errNo: 0
                    }));

                    console.log(...args); // eslint-disable-line
                });
            };
        } else {
            return (req, res) => { // just pipe static file
                res.setHeader('Content-Type', mime.lookup(pathname));
                createReadStream(path.join(testDir, pathname.substring(1))).pipe(res);
            };
        }
    });

    return {
        start, setReceiveHandler
    };
};
