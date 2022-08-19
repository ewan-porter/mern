const ProjectSchema = require('../models/ProjectSchema');
const express = require('express');
const router = express.Router();

router.post('/addproject', async (req, res) => {
  const { projectName, projectDescription } = req.body;

  if (!projectName || !projectDescription)
    return res.status(400).json({ msg: 'Name and description are required' });

 

  const project = await ProjectSchema.findOne({ projectName }); // finding project in db
  if (project) return res.status(400).json({ msg: 'Project already exists' });

  const newProject = new ProjectSchema({ projectName, projectDescription });
  

    
    const savedUserRes = await newProject.save();

    if (savedUserRes)
      return res.status(200).json({ msg: 'project is successfully saved' });
  
});

router.get('/showproject', async (req, res) => {

  try {
    const projects = await ProjectSchema.find({})
    return res.json(projects)
    
  } catch (error) {
    return res.status(400).json({ msg: 'Server Error' });
  }


// console.log(projects)


 


  // if (req.projects) {
  //   return res.json(req.projects);
  // } else {
  //   return res.status(400).json('No projects found');
  // }
});



module.exports = router;
