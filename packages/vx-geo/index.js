'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-geo.production.js');
} else {
  module.exports = require('./umd/vx-geo.development.js');
}
