# browser-js-env

[中文文档](./README_zh.md)   [document](./README.md)

调用浏览器运行一些js代码，并返回结果。可以使用nodeJs接口或者CLI接口调用
- [安装](#%E5%AE%89%E8%A3%85)
- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
  * [命令行快速运行](#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
  * [CLI 选项](#cli-%E9%80%89%E9%A1%B9)
  * [API 快速运行](#api-%E5%BF%AB%E9%80%9F%E8%BF%90%E8%A1%8C)
- [开发](#%E5%BC%80%E5%8F%91)
  * [文件结构](#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
  * [运行测试用例](#%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)

## 安装

`npm i browser-js-env --save` 或者 `npm i browser-js-env --save-dev`

全局安装, 使用 `npm i browser-js-env -g`



## 使用方法

### 命令行快速运行

- jsinbrowser

 调用浏览器运行一些js代码，并返回结果


```shell
命令

    $  ./bin/jsinbrowser -c "module.exports = document.title" --clean
```

```
输出

    browser-js-env:test

```


### CLI 选项

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


### API 快速运行

 调用本地浏览器环境

```js
let browserJsEnv = require('browser-js-env')
browserJsEnv('module.exports = document.title', {
    clean: true
});
```



 支持promise

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv('module.exports=new Promise((resolve) => {setTimeout(() => {resolve(12)}, 50)})', {
    testDir: path.join(__dirname, './__test_dir__2'),
    clean: true
});
```



 支持commonJs (内部通过webpack打包)

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv("require('path')", {
    testDir: path.join(__dirname, './__test_dir__3'),
    clean: true
});
```



 可以快速测试ajax

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



 可以调用不同浏览器中运行，只需要配置appPath

```js
let browserJsEnv = require('browser-js-env')
let path = require('path');

browserJsEnv('module.exports = document.title', {
    testDir: path.join(__dirname, './__test_dir__5'),
    clean: true,
    appPath: '/Applications/Safari.app'
});
```




## 开发

### 文件结构

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


### 运行测试用例

`npm test`

## 许可证

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
