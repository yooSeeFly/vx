'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-tooltip.production.js');
} else {
  module.exports = require('./umd/vx-tooltip.development.js');
}
