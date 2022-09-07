const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
