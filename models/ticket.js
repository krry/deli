var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ticketSchema = new Schema({
  context: {
    type: String,
    required: true
  },
  digits: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    index: { unique: true }
  },
  redeemed: {
    type: Boolean,
    required: true
  },
  date_created : {
    type: Date,
    required: true,
    default: Date.now
  }
});

var ticket = mongoose.model('ticket', ticketSchema);

module.exports = {
  Ticket: ticket
};
