import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
 
  },
  candidates: {
    type: [String],  
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  company:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"companySchema"
  }
});

const jobSchema = mongoose.model('JobSchema', schema);

export default jobSchema;
