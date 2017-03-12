'use strict';

/**
 * 1. loading testing code
 *
 * 2. run testing code
 *
 * 3. get the result of testing code and send it back to server
 */

let passData = null;

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
    return fetch('/__api/__reportData', {
        method: 'POST',
        body: passData
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json); // eslint-disable-line
        window.close();
    });
});
