var app = require('express')();

app.set('view engine', 'jade');
app.set('view cache', false);
app.set('book', process.env.NODE_BOOK || __dirname + '/node_modules/book/node_modules');
app.use(require('serve-static')('.'));
app.use(require('serve-static')('public'));
app.use('/:file.jade', function(req, res, next) {
  res.render(req.params.file);
});
app.get('/:node.demo', function(req, res, next) {
  res.render('demo', {
    node: req.params.node,
    query: req.query
  });
});
app.listen('3000');
