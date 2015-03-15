#!/usr/bin/env node
'use strict';
var meow = require('meow');
var ciaol = require('./');

var cli = meow({
  help: [
    'Usage',
    '  ciaol <input>',
    '',
    'Example',
    '  ciaol Unicorn'
  ].join('\n')
});

ciaol(cli.input[0]);
