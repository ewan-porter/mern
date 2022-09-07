const UserSchema = require('../models/UserSchema');
const express = require('express');
const router = express.Router();

router.put('/vote', async (req, res) => { 
    const { projectId, vote } = req.body;

    if (!projectId || !vote)
    return res.status(400).json({ msg: 'Name and description are required' });


});




module.exports = router;