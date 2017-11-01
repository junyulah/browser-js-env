let browserJsEnv = require('browser-js-env');
browserJsEnv('module.exports = document.title', {
    clean: true,
    appPath: '/Applications/Safari.app'
});
