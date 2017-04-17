#!/usr/bin/env node

'use strict';

let browserJsEnv = require('..');

let yargs = require('yargs');

yargs.usage(`Usage:  jsinbrowser
    -c [js code]
    -t [test directory, default is __test_in_browser_env__]
    -k [keep window, default will close window]
    --clean [clean test directory after running js code]
    `).help('h').alias('h', 'help');

let {
    argv
} = yargs;

browserJsEnv(argv.c, {
    testDir: argv.t,
    keep: argv.k,
    clean: argv.clean
}).catch(err => {
    console.log(err.stack); // eslint-disable-line
});
