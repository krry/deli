var http = require('http'),
    express = require('express'),
    tickets = require('./tickets'),
    mongodb = require('mongodb'),
    app = express();

app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
})

app.post('/tickets', tickets.createTicket);

app.listen(process.env.PORT || 2222);

console.log('taking one');