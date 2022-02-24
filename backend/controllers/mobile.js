const mobileModel = require('../models/mobile');

const positions = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const { start, pageSize } = req.query;
  console.log(start, pageSize);
  const result = await mobileModel.positions(Number(start), Number(pageSize));
  if (result) {
    res.render('succ', {
      data: JSON.stringify({ list: result })
    });
  } else {
    res.render('fail', {
      data: JSON.stringify({ message: '职位添加失败' })
    });
  }
};

module.exports = {
  positions
}