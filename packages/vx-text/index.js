'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-text.production.js');
} else {
  module.exports = require('./umd/vx-text.development.js');
}
