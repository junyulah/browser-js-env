'use strict';

/**
 * 1. loading testing code
 *
 * 2. run testing code
 *
 * 3. get the result of testing code and send it back to server
 */

let retp = require('./test.js');

/**
 * TODO ACK
 */
Promise.resolve(retp).then((ret) => {
    fetch('/__api/__reportData', {
        method: 'POST',
        body: JSON.stringify({
            result: ret,
            type: 'normal'
        })
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json); // eslint-disable-line
        window.close();
    }).catch(err => {
        // TODO handle error
        console.log(err); // eslint-disable-line
    });
});
