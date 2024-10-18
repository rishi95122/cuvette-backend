
import express from 'express';
import { getJobs, postJob } from '../controllers/jobs.controllers.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();


router.get('/:id',protectRoute, getJobs);


router.post('/',protectRoute, postJob);

export default router;
