'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-glyph.production.js');
} else {
  module.exports = require('./umd/vx-glyph.development.js');
}
