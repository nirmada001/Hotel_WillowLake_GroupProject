const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  idNumber: String,
  phoneNumber: String,
  checkIn: String,
  checkOut: String,
  roomType: String,
  username: String  // Add this field to link bookings to users
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
