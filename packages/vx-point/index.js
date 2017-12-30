'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-point.production.min.js');
} else {
  module.exports = require('./umd/vx-point.development.js');
}
