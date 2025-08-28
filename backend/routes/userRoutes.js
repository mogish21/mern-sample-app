import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { addInsurance, getInsurance } from '../controllers/insuranceController.js';

const router = express.Router();

// Sample GET Route
router.post('/login', loginUser);

router.post('/register', registerUser);

// Insurance GET Route
router.get('/insurance', getInsurance);

// Add Insurance
router.post('/insurance', addInsurance);

export default router;
