var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = fs.readFileSync('data/newsTypes.json', 'utf8');

  res.render('layout', {
    newsTypes: JSON.parse(data)
  });
});

module.exports = router;
