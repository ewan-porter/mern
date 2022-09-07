const db = require('../models');
const express = require('express');
const router = express.Router();

router.post('/addproject', async (req, res, next) => {
  const { id } = req.session.user.id;
  const { projectName, projectDescription } = req.body;

  try {
    const user = await db.User.findById(id);
    const project = await db.Project.create({
      projectName,
      projectDescription,
      votes: ({ option: yes, votes: 0 }, { option: no, votes: 0 })
    });
    user.projects.push(project._id);
    await user.save();

    return res.status(201).json({ ...project._doc, user: user._id });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }

  // if (!projectName || !projectDescription)
  //   return res.status(400).json({ msg: 'Name and description are required' });

  // const project = await ProjectSchema.findOne({ projectName }); // finding project in db
  // if (project) return res.status(400).json({ msg: 'Project already exists' });

  // const newProject = new ProjectSchema({ projectName, projectDescription });

  // const savedUserRes = await newProject.save();

  // if (savedUserRes)
  //   return res.status(200).json({ msg: 'project is successfully saved' });
});

router.get('/showproject', async (req, res) => {
  try {
    const projects = await ProjectSchema.find({});
    return res.json(projects);
  } catch (error) {
    return res.status(400).json({ msg: 'Server Error' });
  }
});

module.exports = router;
