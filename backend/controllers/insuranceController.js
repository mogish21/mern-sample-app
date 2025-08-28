// backend/controllers/InsuranceController.js
import Insurance from '../models/Insurance.js';

// get Insurance controller
export const getInsurance = async (req, res) => {
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

export const addInsurance = async (req, res) => {
  const { insuranceId, name } = req.body;
  try {
    const newInsurance = new Insurance({ insuranceId, name });
    await newInsurance.save();
    res.status(201).json({ message: 'Insurance added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error add insurance', error });
  }
};
