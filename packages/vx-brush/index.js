'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-brush.production.js');
} else {
  module.exports = require('./umd/vx-brush.development.js');
}
