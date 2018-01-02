'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-scale.production.js');
} else {
  module.exports = require('./umd/vx-scale.development.js');
}
