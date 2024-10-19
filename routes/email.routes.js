
import express from 'express';
import { sendmails} from '../controllers/email.controllers.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();


router.post('/notify',protectRoute, sendmails);



export default router;
