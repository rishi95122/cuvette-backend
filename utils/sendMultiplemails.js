
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


const sendMulitpleMails = async (recipients, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: recipients.join(', '), 
      subject: subject, 
      text: text,
      html: html,
    };

  
    const info = await transporter.sendMail(mailOptions);
    console.log("mails sent")
   return {status:true}
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendMulitpleMails