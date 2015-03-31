var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'KAYLA!!!' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'KAYLA!!!' });
});

router.get('/gallery', function(req, res) {
  res.render('gallery', { title: 'KAYLA!!!' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'KAYLA!!!' });
});

router.get('/blog', function(req, res) {
  res.render('blog', { title: 'KAYLA!!!' });
});

module.exports = router;