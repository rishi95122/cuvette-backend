import companySchema from "../schema/companySchema.js";
import otpSchema from "../schema/emailOtpSchema.js";
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
  const { name, phone, companyName, companyEmail:email, employeeSize } = req.body;
  console.log(req.body)
  try {
    const existingCompany = await companySchema.findOne({ email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company already registered with this email" });
    }

    const newCompany = new companySchema({
      name,
      phone,
      companyName,
      email,
      employeeSize,
    });

    const savedCompany = await newCompany.save();
    const otpExists = await otpSchema.findOne({ email });
    if (otpExists) {
      await otpSchema.deleteOne({ email });
    }
    res
      .status(200)
      .json({
        message: "Company registered successfully",
        company: savedCompany,
      });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to register company" });
  }
};



export const login = async (req, res) => {
  const { email } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET; 

  try {

    const user = await companySchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


  console.log("ussder",user)
 
    const token = jwt.sign(
      { _id: user._id, companyName: user.companyName },
      JWT_SECRET,
      { expiresIn: '1h' } 
    );

   return res.status(200).json(token );

  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
