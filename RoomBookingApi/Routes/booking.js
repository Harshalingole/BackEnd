const { json } = require('express');
const express = require('express');
const router = express.Router();
// const hallData = require('../Model/bookingSchema');
const { createRoom } = require('../Model/bookingSchema');
const { roomBooking } = require('../Model/bookingSchema');
// /////////////////// Get Call //////////////////////////////////////////

router.get('/', (req, res) => {
  res.send('Booking Home');
});
// Get Call :- List all rooms with Booked data
router.get('/roomlist', async (req, res) => {
  // MongoDb query => to get only customer Name ! Booked Status  From roomBooking Collections
  const cretedRoomData = await createRoom.find(
    { bookStatus: true },
    { roomId: 1, bookStatus: 1, _id: 0 }
  );
  // MongoDb query => to get only CustomerName ! Date ! CheckIn ! CheckOut From roomBooking Collections
  const bookRoomData = await roomBooking.find(
    { roomId: { $gt: 0 } },
    { customerName: 1, date: 1, checkIn: 1, checkOut: 1, roomId: 1, _id: 0 }
  );
  const copyBookroom = [...bookRoomData];
  copyBookroom.forEach(el => {
    el['bookStatus'] = true;
  });
  res.send(copyBookroom);
});
/////////////////////// Post Call -//////////////////////////////////////////
router.post('/', (req, res) => {
  console.log(createRoom);
  res.send('Post Call Success' + createRoom);
});

// Post Call :- Creating Room
router.post('/createroom', async (req, res) => {
  const roomInfo = await createRoom.find();
  // Conditon To Create New Room : Check if roomName and roomId exist
  const nameExist = roomInfo.find(el => el.roomName === req.body.roomName);
  const roomIdExist = roomInfo.find(
    el => el.roomId === Number(req.body.roomId)
  );
  nameExist
    ? res.send('Room with Same Name Already Created')
    : roomIdExist
    ? res.send('id Already Exist!')
    : res.send(await createRoom.create(req.body));
});

// Post Call :- Booking Room
router.post('/bookroom', async (req, res) => {
  const bookRoomData = await roomBooking.find();
  const creteRoomData = await createRoom.find();
  // booking roomId === createRoom Id (Add This)
  // Booking Not Allowed if- Same Date & Time
  const idExist = creteRoomData.find(
    el => el.roomId === Number(req.body.roomId)
  );
  const dateExist = bookRoomData.find(el => el.date === req.body.date);
  !idExist
    ? res.send('Room Id Not Found!')
    : dateExist
    ? res.send('Sorry! Already Booked On Date')
    : res.send(await roomBooking.create(req.body));
  // Update BookStatus of body.roomId in createRoom Collections
  await createRoom.updateOne(
    { roomId: Number(req.body.roomId) },
    { $set: { bookStatus: true }, $currentDate: { lastModified: true } }
  );
  console.log(await roomBooking.find());
});
module.exports = router;
