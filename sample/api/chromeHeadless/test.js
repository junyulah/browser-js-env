const browserJsEnv = require('browser-js-env');
const proc = require('child_process');

const chromeApp = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

browserJsEnv('module.exports = 100 * 2', {
    open: (url) => {
        proc.spawn(chromeApp, ['--headless', '--disable-gpu', url]);
    },
    clean: true
}).then((title) => {
    console.log(title);
});
