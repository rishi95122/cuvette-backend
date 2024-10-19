import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import emailRoutes from './routes/email.routes.js';
import connectDb from './mongo/mongo.js';

dotenv.config();  

const app = express();
app.use(express.json());
const options={
  origin:"https://cuvette-frontend-five.vercel.app",
}
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/email', emailRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDb()
  console.log(`Server running on port ${PORT}`);
});
