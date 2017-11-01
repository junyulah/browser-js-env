let browserJsEnv = require('browser-js-env');

browserJsEnv('module.exports = fetch("/api/test")', {
    apiMap: {
        '/api/test': (req, res) => {
            res.end('hello world!');
        }
    },

    clean: true
}).then((res) => {
    console.log(res);
});
