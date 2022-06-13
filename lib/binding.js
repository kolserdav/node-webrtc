'use strict';

try {
  module.exports = require('../build/Debug/wrtc.node');
} catch (error) {
  console.warn('Accepted release addon');
  module.exports = require('../build/Release/wrtc.node');
}
