var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  res.render('graph', {title: 'DEFAULT TABLE', active: 'IP', include: ['/public/javascripts/mytable.js','/public/javascripts/graph.js']});
});

module.exports = router;
