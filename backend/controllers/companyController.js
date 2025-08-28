import Company from "../models/Company.js";

// get Insurance controller
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    if (!companies) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({companies});
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
