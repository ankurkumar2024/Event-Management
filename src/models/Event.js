const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  participants: { type: Array, required: false, default: [] },
});
const Event = mongoose.model('Event', eventSchema, 'Events');
module.exports = Event;
