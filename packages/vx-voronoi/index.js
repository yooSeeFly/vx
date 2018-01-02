'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-voronoi.production.js');
} else {
  module.exports = require('./umd/vx-voronoi.development.js');
}
