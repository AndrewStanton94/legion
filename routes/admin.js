var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Legatus' });
});

router.get('/clients', function(req, res, next) {
  res.json(Object.keys(CLIENTS));
});

module.exports = router;
