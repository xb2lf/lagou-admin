const { Positions } = require('../utils/db');

const add = (data) => {
  const position = new Positions(data);
  return position.save();
}

const list = () => {
  return Positions.find().sort({ _id: -1 })
}

// 删除用户
const remove = (id) => {
  return Positions.deleteOne({ _id: id });
}


module.exports = {
  add,
  list,
  remove
}