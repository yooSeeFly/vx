'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-hierarchy.production.js');
} else {
  module.exports = require('./umd/vx-hierarchy.development.js');
}
