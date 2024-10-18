import express from 'express';
import { register ,login } from '../controllers/auth.controllers.js';
import { sendOtp, validateOtp } from '../controllers/otp.controllers.js';
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/send-otp',sendOtp);
router.post('/verify-otp',validateOtp);
export default router;
