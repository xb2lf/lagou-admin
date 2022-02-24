const { Positions } = require('../utils/db');

const positions = (start, pagesize) => {
  return Positions.find({}).skip(start).limit(pagesize).sort({ _id: -1 })
}

module.exports = {
  positions
}