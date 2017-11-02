
# browser-js-env
> Calling local browser to run some js code and return the result to you. You can use both nodeJs interfaces or CLI interfaces.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick CLI Example](#quick-cli-example)
  * [check cli options](#check-cli-options)
  * [cli quick start](#cli-quick-start)
- [Quick API Example](#quick-api-example)
  * [quick run](#quick-run)
  * [support promise](#support-promise)
  * [support commonJs (by using webpack)](#support-commonjs-by-using-webpack)
  * [try using safari as a browser](#try-using-safari-as-a-browser)
  * [try using electron as a browser](#try-using-electron-as-a-browser)
  * [try using headless chrome](#try-using-headless-chrome)
- [License](#license)

## Features
- Run js code in browser, get results, can be async.
- Easy to run js code in different browsers.
- Make ajax easy to test.


## Installation

```
npm i browser-js-env --save
```

Install on global
```
npm i browser-js-env -g
```

## Quick CLI Example

### [check cli options](sample/cli/options)  [[show]](doc/images/cliSamples-sample-0.gif)



- run sample

```
$ ./node_modules/.bin/jsinbrowser -h 
Usage:  jsinbrowser
    -c [js code]
    -t [test directory, default is __test_in_browser_env__]
    -k [keep window, default will close window]
    -o [open template cmd for start a browser with url]
    --clean [clean test directory after running js code]


Options:
  -h, --help  Show help                                                [boolean]


```



### [cli quick start](sample/cli/options)  [[show]](doc/images/cliSamples-sample-1.gif)



- run sample

```
$ ./node_modules/.bin/jsinbrowser -c "module.exports=document.title;" 
browser-js-env:test

```






## Quick API Example

### [quick run](sample/api/quickStart)  [[show]](doc/images/apiSamples-sample-0.gif)

- [test.js](../../../..)

```js
let browserJsEnv = require('browser-js-env');
browserJsEnv('module.exports = document.title', {
    clean: true
}).then((title) => {
    console.log(title);
});

```

- run sample

```
$ node test.js 
browser-js-env:test

```



### [support promise](sample/api/supportPromise)  [[show]](doc/images/apiSamples-sample-1.gif)

- [test.js](../../../..)

```js
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

```

- run sample

```
$ node test.js 
12

```



### [support commonJs (by using webpack)](sample/api/commonJs)  [[show]](doc/images/apiSamples-sample-2.gif)

- [test.js](../../../..)

```js
let browserJsEnv = require('browser-js-env');
browserJsEnv("var path = require('path');module.exports = path.join('/a', 'b/c');",

    {
        clean: true
    }).then((title) => {
    console.log(title);
});

```

- run sample

```
$ node test.js 
/a/b/c

```



### [try using safari as a browser](sample/api/appPath)  [[show]](doc/images/apiSamples-sample-3.gif)

- [test.js](../../../..)

```js
let browserJsEnv = require('browser-js-env');
browserJsEnv('module.exports = 2 + 8;', {
    clean: true,
    open: 'open -a /Applications/Safari.app <%=url%>' // for mac os
}).then((ret) => {
    console.log(ret);
});

```

- run sample

```
$ node test.js 
10

```



### [try using electron as a browser](sample/api/electron)  [[show]](doc/images/apiSamples-sample-4.gif)

- [test.js](../../../..)

```js
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

```

- run sample

```
$ node test.js 
browser-js-env:test

```



### [try using headless chrome](sample/api/chromeHeadless)  [[show]](doc/images/apiSamples-sample-5.gif)

- [test.js](../../../..)

```js
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

```

- run sample

```
$ node test.js 
200

```






## License

browser-js-env is [MIT licensed](./LICENSE)

___
Document was generated by [docway](https://github.com/LoveKino/docway).
