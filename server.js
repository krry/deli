var http = require('http')
  , express = require('express')
  , morgan = require('morgan')
  , tickets = require('./routes/tickets')
  , mongoose = require('mongoose')
  , path = require('path')
  , exphbs = require('express3-handlebars')
  , favicon = require('static-favicon')
  , app = express();

var hbs = exphbs.create({
  defaultLayout: 'main'
});

mongoose.connect('mongodb://localhost/ticket_roll');

var env = process.env.NODE_ENV || 'development';

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(require('body-parser')());
app.use(require('method-override')());
app.use(favicon(__dirname + '/app/favicon.ico'));

if ('development' == env) {
  app.set('port', 2222);
  app.use(morgan({ format: 'dev', immediate: true }));
}

if ('production' == env) {
  app.set('port', process.env.PORT);
  app.use(morgan());
}

app.get('/', tickets.index);
app.get('/tickets/:code', tickets.show);
app.get('/tickets', tickets.showall);
app.post('/tickets', tickets.create);
app.put('/tickets', tickets.update);
app.del('/tickets', tickets.delete);

app.listen(app.get('port'));
