import sendMulitpleMails from '../utils/sendMultiplemails.js'
export const sendmails = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;
  const subject = 'Job Alert';
  const text = 'New Job opportunity for you';
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Opportunity</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">Job Opportunity</h1>
       
    </div>

    <p style="font-size: 16px;">Dear Candidate,</p>

    <p style="font-size: 16px;">${text}</p>

    <div style="background-color: #ecf0f1; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h2 style="color: #2c3e50; margin-top: 0;">Job Details:</h2>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 10px;"><strong style="color: #34495e;">Title:</strong> ${jobTitle}</li>
            <li style="margin-bottom: 10px;"><strong style="color: #34495e;">Description:</strong> ${jobDescription}</li>
            <li style="margin-bottom: 10px;"><strong style="color: #34495e;">Experience Level:</strong> ${experienceLevel}</li>
            <li style="margin-bottom: 10px;"><strong style="color: #34495e;">Application Deadline:</strong> ${endDate.toString().slice(0,10)}</li>
        </ul>
    </div>

    <p style="font-size: 16px;">If you have any questions, please don't hesitate to contact us.</p>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #bdc3c7;">
        <p style="font-size: 16px; margin-bottom: 5px;">Best regards,</p>
        <p style="font-size: 16px; font-weight: bold; color: #2c3e50;">Hiring Team</p>
    </div>

    <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #7f8c8d;">
        <p>© 2023 Cuv. All rights reserved.</p>
    </div>
</body>
</html>
`;

  try {
    const mailsInfo = await sendMulitpleMails(candidates, subject, text, html); 
    if (!mailsInfo) {
      return res.status(500).json({ error: 'An error occurred while sending emails.' });
    }
    
    return res.status(200).json({message:"Emails sent"}) 
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({ error: 'An error occurred while sending emails.' });
  }
};
