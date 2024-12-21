const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true },
    guests: { type: Number, required: true },
    foodRequired: { type: String, required: true }, 
    date: { type: Date, required: true }, 
    timeFrom: { type: String, required: true }, 
    timeTo: { type: String, required: true }, 
    paymentMethod: { type: String, required: true }, 
    username: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
