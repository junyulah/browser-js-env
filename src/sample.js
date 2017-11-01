'use strict';

let mochaStyle = require('docway/tool/mochaStyle');
let quickAPIStart = require('../sample/quickAPIStart');
let quickiCLIStart = require('../sample/quickCLIStart');

mochaStyle(quickAPIStart);
mochaStyle(quickiCLIStart);
