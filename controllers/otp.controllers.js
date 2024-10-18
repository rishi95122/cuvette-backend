import otpSchema from '../schema/emailOtpSchema.js'
import sendEmail from '../utils/sendEmail.js';


export const sendOtp = async (req, res) => {
  try {
    const { companyEmail:email } = req.body;
    console.log(req.body)
    const otpExists = await otpSchema.findOne({ email });
    if (otpExists) {
      return res.status(400).json({ message: 'OTP already sent. Please wait for 2 minutes before requesting again.' });
    }
 const otpLength = 6; 
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    console.log("OTP Generated",otp);
    const otpRecord = new otpSchema({ email, otp });
    await otpRecord.save();
    await sendEmail(email, otp);
    console.log('Mobile OTP sent successfully');
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: err.message });
  }
};


export const validateOtp = async (req, res) => {
  console.log(req.body)
  try {
    const { email, otp } = req.body;
    const otpRecord = await otpSchema.findOne({ email, otp });
    console.log("record",otpRecord)

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    
   return  res.status(200).json({ message: 'OTP validated successfully' });
  } catch (err) {
    console.error('Error validating OTP:', err);
    res.status(500).json({ message: err.message });
  }
};