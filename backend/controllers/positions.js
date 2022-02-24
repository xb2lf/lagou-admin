const moment = require('moment');
const positionModel = require('../models/positions');


const add = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const result = await positionModel.add({
    ...req.body,
    companyLogo: req.companyLogo,
    createTime: moment().format('YYYY年MM月DD日 HH:mm')
  });
  if (result) {
    process.socket.emit('message', 'ok');
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
      data: JSON.stringify({ message: '职位获取失败' })
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

const update = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const data = {
    ...req.body,
  };
  if (req.companyLogo) {
    data.companyLogo = req.companyLogo;
  }
  const result = await positionModel.update(data);
  if (result) {
    res.render('succ', {
      data: JSON.stringify({ message: '职位更新成功' })
    });
  } else {
    res.render('fail', {
      data: JSON.stringify({ message: '职位更新失败' })
    });
  }
}

const listone = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const { id } = req.body;
  const result = await positionModel.listone(id);
  if (result) {
    res.render('succ', {
      data: JSON.stringify({ data: result })
    });
  } else {
    res.render('fail', {
      data: JSON.stringify({ message: '数据获取失败' })
    });
  }
}

module.exports = {
  add,
  list,
  remove,
  update,
  listone
}