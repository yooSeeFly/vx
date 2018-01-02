'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./umd/vx-boxplot.production.js');
} else {
  module.exports = require('./umd/vx-boxplot.development.js');
}
