
import express from 'express';
import { sendmails} from '../controllers/email.controllers.js';

const router = express.Router();


router.post('/notify', sendmails);



export default router;
