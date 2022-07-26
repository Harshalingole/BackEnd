const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 5000;

const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const Routes = require('./Routes/booking');

mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
});
mongoose.connection
  .once('open', () => console.log('Connected to database'))
  .on('error', err => console.log('error with the databse', err));

// app.use(cors());
app.use(bodyParser.json());
app.use('/', Routes);
app.listen(port, () => {
  console.log(`Connected To ${port} App: Booking`);
});
