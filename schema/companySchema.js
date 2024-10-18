import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  employeeSize: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const companySchema = mongoose.model('companySchema', formSchema);

export default companySchema;
