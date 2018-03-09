var express = require('express');
var router = express.Router();
module.exports = function (app) {
  router.get('/', function (req, res, next) {
    res.render('build/index.html', { title: 'Note' });
  });
  app.use('/users', require('./server/user'));
  app.use('/notes', require('./server/note'));
};