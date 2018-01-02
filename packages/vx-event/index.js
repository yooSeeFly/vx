'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-event.production.js');
} else {
  module.exports = require('./umd/vx-event.development.js');
}
