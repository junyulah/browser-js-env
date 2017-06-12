# browser-js-env

[中文文档](./README_zh.md)   [document](./README.md)

Calling local browser to run some js code and return the result to you. You can use nodeJs interfaces or CLI interfaces.
- [install](#install)
- [usage](#usage)
  * [CLI quick run](#cli-quick-run)
  * [CLI options](#cli-options)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i browser-js-env --save` or `npm i browser-js-env --save-dev`

Install on global, using `npm i browser-js-env -g`



## usage

### CLI quick run

- jsinbrowser

Calling browser to run some js code and return the result to you.


```shell
commands

    $  ./bin/jsinbrowser -c "module.exports = document.title" --clean
```

```
output

    browser-js-env:test

```


### CLI options

- jsinbrowser

```shell

$ ./node_modules/browser-js-env/bin/jsinbrowser -h

Usage:  jsinbrowser
    -c [js code]
    -t [test directory, default is __test_in_browser_env__]
    -k [keep window, default will close window]
    -a [app path, used to open url]
    --clean [clean test directory after running js code]


Options:
  -h, --help  Show help                                                [boolean]


```


### API quick run

Calling local browser environment

```js
let browserJsEnv = require('browser-js-env')
browserJsEnv('module.exports = document.title', {
    clean: true
});
```



Support promise

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv('module.exports=new Promise((resolve) => {setTimeout(() => {resolve(12)}, 50)})', {
    testDir: path.join(__dirname, './__test_dir__2'),
    clean: true
});
```



Support commonJs (using webpack)

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv("require('path')", {
    testDir: path.join(__dirname, './__test_dir__3'),
    clean: true
});
```



Make ajax testing simple

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv('module.exports = fetch("/api/test")', {
    testDir: path.join(__dirname, './__test_dir__4'),
    apiMap: {
        '/api/test': (req, res) => {
            res.end("hello world!");
        }
    },

    clean: true
});
```



Run js code in difference browser, just configure appPath

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv('module.exports = document.title', {
    testDir: path.join(__dirname, './__test_dir__5'),
    clean: true,
    appPath: '/Applications/Safari.app'
});
```




## develop

### file structure

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──TODO.md    
│──bin    
│   └──jsinbrowser    
│──index.js    
│──package.json    
│──src    
│   │──buildTestProject.js    
│   │──env.js    
│   │──index.js    
│   │──pageTpl    
│   │   │──favicon.ico    
│   │   │──index.js    
│   │   └──plain.html    
│   └──server.js    
└──test    
    │──fixture    
    │   └──webpackRequire    
    │       │──add.js    
    │       └──index.js    
    └──function    
        │──ajax.js    
        └──index.js     
```


### run tests

`npm test`

## license

MIT License

Copyright (c) 2017 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
