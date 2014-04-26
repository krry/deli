var http = require('http')
  , express = require('express')
  , morgan = require('morgan')
  , tickets = require('./routes/tickets')
  , mongoose = require('mongoose')
  , path = require('path')
  , exphbs = require('express3-handlebars')
  , app = express();

var hbs = exphbs.create({
  extName: '.hbs',
  defaultLayout: 'main'
});

mongoose.connect('mongodb://localhost/ticket_roll');

var env = process.env.NODE_ENV || 'development';

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(require('body-parser')());
app.use(require('method-override')());

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
