#!/usr/bin/env node
const path = require('path');
const fs = require('fs-extra');

if(fs.existsSync('../../../bin/init.js'))
  process.exit(-1);
console.log('copy template')
fs.copySync(path.resolve(__dirname, '..'), '../../../',{overwrite:true});
console.log('npm i')
