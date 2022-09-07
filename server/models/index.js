const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_CONNECTION_STRING);

module.exports.User = require('./UserSchema');
module.exports.Project = require('./ProjectSchema');
