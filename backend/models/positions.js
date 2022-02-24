const { Positions } = require('../utils/db');

const add = (data) => {
  const position = new Positions(data);
  return position.save();
}

const list = () => {
  return Positions.find().sort({ _id: -1 })
}

// 删除职位
const remove = (id) => {
  return Positions.deleteOne({ _id: id });
}

const update = (data) => {
  return Positions.findByIdAndUpdate(data.id, data)
}

const listone = (id) => {
  return Positions.findOne({ _id: id })
}

module.exports = {
  add,
  list,
  remove,
  update,
  listone
}