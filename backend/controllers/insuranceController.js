// backend/controllers/InsuranceController.js
const Insurance = require('../models/Insurance');

// get Insurance controller
const getInsurance = async (req, res) => {
  try {
    const insurance = await Insurance.find();
    if (!insurance) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({insurance});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = {
  getInsurance,
};
