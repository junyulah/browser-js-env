let browserJsEnv = require('browser-js-env');
browserJsEnv('module.exports = 2 + 8;', {
    clean: true,
    open: 'open -a /Applications/Safari.app <%=url%>' // for mac os
}).then((ret) => {
    console.log(ret);
});
