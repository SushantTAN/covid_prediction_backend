const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 200,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  }
});

module.exports = mongoose.model('CovidAppUser', userSchema);