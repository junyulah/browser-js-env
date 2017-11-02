const browserJsEnv = require('browser-js-env');
const electron = require('electron');
const proc = require('child_process');

browserJsEnv('module.exports = document.title', {
    open: (url) => {
        proc.spawn(electron, [url]);
    },
    clean: true
}).then((title) => {
    console.log(title);
});
