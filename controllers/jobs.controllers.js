import jobSchema from "../schema/jobSchema.js";
import sendMulitpleMails from '../utils/sendMultiplemails.js'
export const getJobs = async (req, res) => {
  const {_id}=req.user;

  try {
    const jobs = await jobSchema.find({company:_id});
    console.log(jobs)
   return res.status(200).json(jobs);
  } catch (error) {
   return res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const postJob = async (req, res) => {
  const {_id:company}=req.user
  const { jobTitle, jobDescription, experienceLevel, candidates, endDate } = req.body;
  try {
    const newJob = new jobSchema({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
      company
    });
    const savedJob = await newJob.save();
    const subject = 'Job Alert';
const text = 'New Job oppurtunity for you';
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

    const mailsInfo=sendMulitpleMails(candidates,subject,text,html)
    if(!mailsInfo)  return res.status(500).json({ error: 'Failed to create job' })
    
   return res.status(200).json({message:"Job added"});
  } catch (error) {
   return res.status(500).json({ error: 'Failed to create job' });
  }
};
