import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import { getInsurance } from '../controllers/insuranceController.js';

const router = express.Router();

// Sample GET Route
router.post('/login', loginUser);

router.post('/register', registerUser);

// Insueance GET Route
router.get('/insurance', getInsurance);

export default router;
