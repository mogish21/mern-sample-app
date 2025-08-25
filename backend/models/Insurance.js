// backend/models/User.js

const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
  insurtanceId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

const User = mongoose.model('Insurance', InsuranceSchema);

module.exports = User;
