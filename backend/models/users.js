const { Users } = require('../utils/db');

// 查找用户
const findUser = (username) => {
  return Users.findOne({ username })
};

// 注册用户
const signup = ({ username, password }) => {
  const users = new Users({
    username,
    password
  });
  return users.save();
}

//获取用户列表
const findList = () => {
  return Users.find().sort({ _id: -1 })
}

// 删除用户
const remove = (id) => {
  return Users.deleteOne({ _id: id });
}

module.exports = {
  signup,
  findUser,
  findList,
  remove
}