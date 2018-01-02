'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-bounds.production.js');
} else {
  module.exports = require('./umd/vx-bounds.development.js');
}
