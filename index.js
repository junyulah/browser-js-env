'use strict';

module.exports = require('./src');

/**
 * @readme-quick-run
 *
 * Calling local browser environment
 * [readme-lang:zh] 调用本地浏览器环境
 *
 * ##test tar=js r_c=browserJsEnv
 *
 * browserJsEnv('module.exports = document.title', {
 *     clean: true
 * });
 */

/**
 * @readme-quick-run
 *
 * Support promise
 * [readme-lang:zh] 支持promise
 *
 * ##test tar=js r_c=browserJsEnv
 *
 * let path = require('path');
 *
 * browserJsEnv('module.exports=new Promise((resolve) => {setTimeout(() => {resolve(12)}, 50)})', {
 *     testDir: path.join(__dirname, './__test_dir__2'),
 *     clean: true
 * });
 */

/**
 * @readme-quick-run
 *
 * Support commonJs (using webpack)
 * [readme-lang:zh] 支持commonJs (内部通过webpack打包)
 *
 * ##test tar=js r_c=browserJsEnv
 *
 * let path = require('path');
 *
 * browserJsEnv("require('path')", {
 *     testDir: path.join(__dirname, './__test_dir__3'),
 *     clean: true
 * });
 */

/**
 *
 * @readme-quick-run
 *
 * Make ajax testing simple
 * [readme-lang:zh] 可以快速测试ajax
 *
 * ## test tar=js r_c=browserJsEnv
 *
 * let path = require('path');
 *
 * browserJsEnv('module.exports = fetch("/api/test")', {
 *     testDir: path.join(__dirname, './__test_dir__4'),
 *     apiMap: {
 *         '/api/test': (req, res) => {
 *             res.end("hello world!");
 *         }
 *     },
 *
 *     clean: true
 * });
 */

/**
 *
 * @readme-quick-run
 *
 * Run js code in difference browser, just configure appPath
 * [readme-lang:zh] 可以调用不同浏览器中运行，只需要配置appPath
 *
 * ## test tar=js r_c=browserJsEnv
 *
 * let path = require('path');
 *
 * browserJsEnv('module.exports = document.title', {
 *     testDir: path.join(__dirname, './__test_dir__5'),
 *     clean: true,
 *     appPath: '/Applications/Safari.app'
 * });
 */
