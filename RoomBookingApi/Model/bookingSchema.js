const mongoose = require('mongoose');
// Creating Room
const createRoomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
  seatAvailable: {
    type: Number,
    required: true,
  },
  ammenties: {
    type: Array,
    required: true,
  },
  hourlyPrice: {
    type: Number,
    required: true,
  },
  bookStatus: {
    type: Boolean,
    require: true,
  },
});

const createRoom = mongoose.model('createRoom', createRoomSchema);

const roomBookingSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
  bookStatus: {
    type: Boolean,
  },
});

const roomBooking = mongoose.model('roomBooking', roomBookingSchema);

module.exports = {
  createRoom: createRoom,
  roomBooking: roomBooking,
};
