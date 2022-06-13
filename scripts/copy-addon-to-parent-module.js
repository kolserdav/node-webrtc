'use strict';

const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../build/Release/wrtc.node');
const destPath = path.resolve(__dirname, '../../dist/node-webrtc/build');
if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, fs.constants.S_IRWU);
}
const releasePath = path.resolve(destPath, 'Release');
if (!fs.existsSync(releasePath)) {
  fs.mkdirSync(releasePath, fs.constants.S_IRWU);
}
fs.copyFileSync(
  srcPath,
  path.resolve(releasePath, 'wrtc.node'),
  fs.constants.COPYFILE_FICLONE_FORCE
);
