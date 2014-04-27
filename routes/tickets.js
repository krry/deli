var Ticket = require('../models/ticket').Ticket;
var helper = require('../helpers/helper');

exports.index = function(req, res) {
  res.render('index', {
    title: 'Hello welcome'
  });
}

exports.showall = function(req, res) {
  Ticket.find({}, function(err, docs) {
    if (!err) {
      res.json(200, { tickets: docs });
    }
    else {
      res.json(500, { message: err });
    }
  });
}

exports.create = function(req, res) {
  var newId, newCode, newTicket;
  var dgts = req.body.digits || 6;
  var cntxt = req.body.context;

  Ticket.count({context: cntxt, digits: dgts}, function(err, c) {
    if (!err) {
      newId = c++;

      if (c >= Math.pow(10, dgts)) {
        res.json(500, { message: "All out of codes of that length. Try asking for more digits"});
      } else {
        newCode = cntxt+helper.pad(newId, dgts);
        newTicket = new Ticket();
        newTicket.context = cntxt;
        newTicket.digits = dgts;
        newTicket.code = newCode;
        newTicket.redeemed = false;
        newTicket.save(function(err) {
          if(!err) {
            res.json(201, newTicket);
          } else {
            res.json(500, { message: "Couldn\'t create a ticket. Error: " + err });
          }
        });
      }
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res){
  Ticket.find({ code: code }, function(err, doc){
    if (!err && doc) {
      res.json(200, doc);
    } else if (err) {
      res.json(500, { message: "Error finding ticket: " + err });
    } else {
      res.json(404, { message: "No ticket with that code." });
    }
  });
}

exports.update = function(req, res) {
  var id = req.body.id;
  var redeemed = req.body.redeemed;

  Ticket.findById(id, function(err, doc){
    if (!err && doc) {
      doc.redeemed = req.body.redeemed;
      doc.save(function(err) {
        if (!err) {
          if (redeemed==="true") {
            res.json(200, { message: "Ticket redeemed" });
          } else {
            res.json(200, { message: "Ticket unredeemed" });
          }
        } else {
          res.json(500, { message: "Error redeeming ticket: " + err });
        }
      });
    } else if (!err) {
      res.json(404, { message: "Couldn\'t find a ticket with that id" });
    } else {
      res.json(500, { message: "Couldn\'t redeem that ticket because error: " + err });
    }
  });
}

exports.delete = function(req, res) {
  var id = req.body.id;
  Ticket.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Ticket destroyed" });
    } else if (!err) {
      res.json(404, { message: "No ticket with that id." });
    } else {
      res.json(403, { message: "Couldn\'t destroy that ticket because error: " + err });
    }
  })
}