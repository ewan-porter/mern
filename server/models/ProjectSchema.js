const mongoose = require('mongoose');
const User = require('./index');

const voteSchema = new mongoose.Schema({
  option: String,
  vote: {
    type: Number,
    default: 0
  }
});

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  votes: [voteSchema],
  date: {
    type: Date,
    default: Date.now
  },
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

ProjectSchema.pre('remove', async function (next) {
  try {
    const user = await User.findById(this.user);
    user.projects = user.projects.filter(
      (project) => project._id.toString() !== this._id.toString()
    );
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
