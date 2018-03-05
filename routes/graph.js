var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  res.render('graph',{
    title: 'DEFAULT TABLE',
    active: 'IP',
    include: ['/public/bootstrap-3.3.7-dist/js/vis.js','/public/javascripts/mylib.js','/public/javascripts/graph.js'],
    css: ['/public/bootstrap-3.3.7-dist/css/vis.css', '/public/stylesheets/graph.css']
  });
});

module.exports = router;
