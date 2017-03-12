'use strict';

/**
 * 1. loading testing code
 *
 * 2. run testing code
 *
 * 3. get the result of testing code and send it back to server
 */

// TODO exception when require?
let retp = require('./test.js');

/**
 * TODO ACK
 */
Promise.resolve(retp).then((ret) => {
    let passData = null;

    try {
        passData = JSON.stringify({
            result: ret,
            type: 'normal'
        });
    } catch (err) {
        passData = JSON.stringify({
            errorMsg: `The result of js code can not be json stringified. Result is ${ret}.`,
            type: 'error'
        });
    }

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
