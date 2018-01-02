'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-annotation.production.js');
} else {
  module.exports = require('./umd/vx-annotation.development.js');
}
