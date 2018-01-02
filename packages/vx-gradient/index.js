'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-gradient.production.js');
} else {
  module.exports = require('./umd/vx-gradient.development.js');
}
