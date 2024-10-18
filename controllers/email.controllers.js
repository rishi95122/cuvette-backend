export const sendmails = async (req, res) => {
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;
  const subject = 'Job Alert';
  const text = 'New Job opportunity for you';
  
  const html = `<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <p>Subject: <strong>${subject}</strong></p>
    
      <p>Dear Candidate,</p>
    
      <p>${text}</p>
    
      <h3>Job Details:</h3>
      <ul>
        <li><strong>Title:</strong> ${jobTitle}</li>
        <li><strong>Description:</strong> ${jobDescription}</li>
        <li><strong>Experience Level:</strong> ${experienceLevel}</li>
        <li><strong>Application Deadline:</strong> ${endDate}</li>
      </ul>
    
      <p>If you have any questions, please don't hesitate to contact us.</p>
    
      <p>Best regards,<br>dsads Hiring Team</p>
    </body>
    </html>`;

  try {
    const mailsInfo = await sendMulitpleMails(candidates, subject, text, html); 
    if (!mailsInfo) {
      return res.status(500).json({ error: 'An error occurred while sending emails.' });
    }
    
    return res.status(200) 
  } catch (error) {
    console.error('Error sending emails:', error);
    return res.status(500).json({ error: 'An error occurred while sending emails.' });
  }
};
