'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-responsive.production.js');
} else {
  module.exports = require('./umd/vx-responsive.development.js');
}
