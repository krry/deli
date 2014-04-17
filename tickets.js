var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var mongoClient = new MongoClient(new Server('localhost', 27017));
var db = mongoClient.db('ticketdb');

db.open(function(err, db) {
  if (!err) {
    console.log("connected to ticketdb");
    db.collection('tickets', {strict: true}, function(err, collection) {
      if (err) {
        console.log("No collection called 'tickets'. Creating it now.");
        seedDB();
      }
    })
  }
});

// get tickets
exports.showTickets = function(req, res) {
  db.collection('tickets', function(err, collection) {
    if (err) {
      res.send({"error": "unable to gather tickets from db"});
    } else {
      console.log("Success: " + JSON.stringify(results))
    }
  })
}

// returns a new ticket
exports.createTicket = function(req, res) {
  var ticket = req.body;
  console.log("creating ticket: " + JSON.stringify(ticket));
  db.collection('tickets', function(err, collection) {
    collection.insert(ticket, {safe: true}, function(err, result) {
      if (err) {
        res.send({"error": "Unable to insert this ticket into the db"});
      }
      else {
        console.log("Success: " + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    })
  })
}

var seedDB = function() {
  var tickets = [
    {
      timestamp: Date.now(),
      domain: "example.com",
      context: "EX",
      code: "EX0001"
    }
  ];
};