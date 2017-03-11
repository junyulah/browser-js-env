'use strict';

let crudeServer = require('crude-server');
let path = require('path');
let {
    createReadStream
} = require('fs');

module.exports = ({
    testDir,
    reportPath = '/__api/__reportData'
}) => {
    let indexHTML = path.join(testDir, 'index.html');
    let appHTML = path.join(testDir, 'asset/app.js');

    let receiveHandler = null;

    let setReceiveHandler = (handler) => {
        receiveHandler = handler;
    };

    let {
        start, stop
    } = crudeServer((pathname) => {
        if (pathname === '/index.html') {
            return (req, res) => {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                createReadStream(indexHTML).pipe(res);
            };
        } else if (pathname === '/asset/app.js') {
            return (req, res) => {
                res.setHeader('Content-Type', 'application/javascript');
                createReadStream(appHTML).pipe(res);
            };
        } else if (pathname === reportPath) {
            return (req, res) => {
                let str = '';
                req.on('data', (chunk) => {
                    str += chunk.toString();
                });

                req.on('end', () => {
                    let data = JSON.parse(str);

                    res.end(JSON.stringify({
                        errNo: 0
                    }));

                    stop().then(() => {
                        receiveHandler && receiveHandler(data);
                    });
                });
            };
        }
    });

    return {
        start, setReceiveHandler
    };
};
