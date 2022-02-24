const moment = require('moment');
const positionModel = require('../models/positions')

const add = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const result = await positionModel.add({
    ...req.body,
    createTime: moment().format('YYYY年MM月DD日 HH:mm')
  });
  if (result) {
    res.render('succ', {
      data: JSON.stringify({ message: '职位添加成功' })
    });
  } else {
    res.render('fail', {
      data: JSON.stringify({ message: '职位添加失败' })
    });
  }
};

const list = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const result = await positionModel.list();
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

const remove = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const { id } = req.body;
  const result = await positionModel.remove(id);
  try {
    if (result.deletedCount) {
      res.render('succ', {
        data: JSON.stringify({ message: '职位删除成功' })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({ message: '职位删除失败' })
      })
    }
  } catch (error) {
    res.render('fail', {
      data: JSON.stringify({ message: '职位删除失败' })
    })
  }
}

module.exports = {
  add,
  list,
  remove
}