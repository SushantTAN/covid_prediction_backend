const mongoose = require('mongoose');

const covidEntry = new mongoose.Schema({
  fever: {
    type: Number,
    required: true,
    min: 80,
    max: 110,
  },
  body_pain: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },

  runny_nose: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  difficulty_breathing: {
    type: String,
    required: true,
    enum: ['None', 'Mild', 'Difficult']
  },
  infected: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  user: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model('CovidEntry', covidEntry);