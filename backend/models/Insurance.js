// backend/models/User.js

import mongoose from 'mongoose';

const InsuranceSchema = new mongoose.Schema({
  insuranceId: {
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

export default User;