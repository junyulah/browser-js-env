let browserJsEnv = require('browser-js-env');

browserJsEnv(`
module.exports = new Promise((resolve) => {
    setTimeout(() => {
        resolve(12)
    }, 50);
})`,

    {
        clean: true
    }).then((value) => {
    console.log(value);
});
