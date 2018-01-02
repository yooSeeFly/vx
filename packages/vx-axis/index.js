'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-axis.production.js');
} else {
  module.exports = require('./umd/vx-axis.development.js');
}
