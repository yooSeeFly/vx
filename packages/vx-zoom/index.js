'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-zoom.production.js');
} else {
  module.exports = require('./umd/vx-zoom.development.js');
}
