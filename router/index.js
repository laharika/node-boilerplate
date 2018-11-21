'use strict';

module.exports = function (app) {
  app.use('/api/test', require('../app/commons'));
  app.use('/api/freshsales', require('../app/freshsales'));
};
