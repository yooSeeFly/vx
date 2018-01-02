'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-stats.production.js');
} else {
  module.exports = require('./umd/vx-stats.development.js');
}
