let browserJsEnv = require('browser-js-env');
browserJsEnv('module.exports = document.title', {
    clean: true
}).then((title) => {
    console.log(title);
});
