'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-legend.production.js');
} else {
  module.exports = require('./umd/vx-legend.development.js');
}
