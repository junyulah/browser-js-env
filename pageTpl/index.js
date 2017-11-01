'use strict';

// hack console.log used to pipe log from web client

/**
 * 1. loading testing code
 *
 * 2. run testing code
 *
 * 3. get the result of testing code and send it back to server
 */

// TODO log stream

let passData = null;

let oldLog = console.log; // eslint-disable-line

const reportPath = '/__api/__reportData';
const logPath = '/__api/__log';

console.log = function(...args) { // eslint-disable-line
    fetch(logPath, {
        method: 'POST',
        body: JSON.stringify(args)
    });

    // send log to server
    return oldLog.apply(this, args);
};

try {
    // TODO exception when require?
    let retp = require('./test.js');

    passData = Promise.resolve(retp).then((ret) => {
        try {
            return JSON.stringify({
                result: ret,
                type: 'normal'
            });
        } catch (err) {
            return JSON.stringify({
                errorMsg: `The result of js code can not be json stringified. Result is ${ret}.`,
                type: 'error'
            });
        }
    }).catch((err) => {
        return JSON.stringify({
            errorMsg: err.toString(),
            stack: err.stack,
            type: 'error'
        });
    });
} catch (err) {
    passData = JSON.stringify({
        errorMsg: err.toString(),
        stack: err.stack,
        type: 'error'
    });
}

/**
 * TODO ACK
 */
Promise.resolve(passData).then((passData) => {
    return fetch(reportPath, {
        method: 'POST',
        body: passData
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json); // eslint-disable-line
        // TODO option to keep window
        if (!json.keep) {
            window.close();
        }
    });
});
