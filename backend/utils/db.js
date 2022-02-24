const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//构建users的model
var usersSchema = mongoose.Schema({
  username: String,
  password: String
});

//构建positions的model
var positionsSchema = mongoose.Schema({
  companyLogo: String,
  companyName: String,
  positionName: String,
  city: String,
  createTime: String,
  salary: String
})

var Users = mongoose.model('users', usersSchema);
var Positions = mongoose.model('positions', positionsSchema);

module.exports = {
  Users,
  Positions
}