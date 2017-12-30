'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-shape.production.min.js');
} else {
  module.exports = require('./umd/vx-shape.development.js');
}
