const browserJsEnv = require('browser-js-env');
const electron = require('electron');
const proc = require('child_process');

browserJsEnv('module.exports = document.title', {
    // using open interface can be more flexible
    open: (url) => {
        proc.spawn(electron, [url]);
    },
    clean: true
}).then((title) => {
    console.log(title);
});
