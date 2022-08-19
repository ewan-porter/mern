const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Password and email are required' });

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password should be at least 8 characters long' });
  }

  const user = await UserSchema.findOne({ email }); // finding user in db
  if (user) return res.status(400).json({ msg: 'User already exists' });

  const newUser = new UserSchema({ email, password });
  // hasing the password
  bcrypt.hash(password, 7, async (err, hash) => {
    if (err)
      return res.status(400).json({ msg: 'error while saving the password' });

    newUser.password = hash;
    const savedUserRes = await newUser.save();

    if (savedUserRes)
      return res.status(200).json({ msg: 'user is successfully saved' });
  });
});

router.post(`/login`, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: 'Something missing' });
  }

  const user = await UserSchema.findOne({ email: email }); // finding user in db
  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  // comparing the password with the saved hash-password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    //add user to session
    const userSession = { email: user.email };
    req.session.user = userSession;
    return res.status(200).json({ msg: 'You have logged in successfully' });
  } else {
    return res.status(400).json({ msg: 'Invalid credential' });
  }
});

router.get('/isAuth', async (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json('unauthorize');
  }
});

router.delete('/logout', async (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else { 
        res.send("User Logged Out")
      }
    });
  } else {
    res.end()
  }
})

module.exports = router;
