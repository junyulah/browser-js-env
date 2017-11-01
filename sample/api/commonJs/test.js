let browserJsEnv = require('browser-js-env');
browserJsEnv("var path = require('path');module.exports = path.join('/a', 'b/c');",

    {
        clean: true
    }).then((title) => {
    console.log(title);
});
