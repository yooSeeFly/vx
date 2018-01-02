'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-clip-path.production.js');
} else {
  module.exports = require('./umd/vx-clip-path.development.js');
}
