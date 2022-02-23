const usersModel = require('../models/users');
const { hash, compare, sign, verify } = require('../utils/tools');

// 注册用户
const signup = async (req, res, next) => {
  const { username, password } = req.body;
  res.set('content-type', 'application/json;charset=utf-8');
  // 密码加密
  const bcryptPassword = await hash(password);
  // 判断用户是否存在
  const findResult = await usersModel.findUser(username);
  if (findResult) {
    res.render('fail', {
      data: JSON.stringify({ message: '用户名已存在' })
    })
  } else {
    // 数据库里没有这个用户，开始添加用户
    const result = await usersModel.signup({ username, password: bcryptPassword });
    res.render('succ', {
      data: JSON.stringify({ message: '用户注册成功' })
    })
  }
};

// 获取用户列表
const list = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const listResult = await usersModel.findList();
  res.render('succ', {
    data: JSON.stringify(listResult)
  })
}

// 删除用户
const remove = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const { id } = req.body;
  const result = await usersModel.remove(id);
  if (result) {
    res.render('succ', {
      data: JSON.stringify({ message: '用户删除成功' })
    })
  }
  res.render('fail', {
    data: JSON.stringify({ message: '用户删除失败' })
  })
}

// 登录
const signin = async (req, res, next) => {
  res.set('content-type', 'application/json;charset=utf-8');
  const { username, password } = req.body;
  const result = await usersModel.findUser(username);
  //验证用户是否是合法用户
  if (result) {
    const { password: hashPwd } = result;
    const compareResult = await compare(password, hashPwd);
    if (compareResult) {
      /* req.session.username = username */
      const token = sign(username);
      res.set('X-Access-Token', token);
      res.render('succ', {
        data: JSON.stringify({ username })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({ message: '用户名或密码错误' })
      })
    }
  } else {
    res.render('fail', {
      data: JSON.stringify({ message: '用户名或密码错误' })
    })
  }
}

// 退出登录
const signout = async (req, res, next) => {
  req.session = null;
  res.render('succ', {
    data: JSON.stringify({ message: '成功退出登录' })
  })
}

const isAuth = async (req, res, next) => {
  const token = req.get('X-Access-Token');
  try {
    const result = verify(token);
    if (result.username) {
      res.render('succ', {
        data: JSON.stringify({ username: result.username })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({ message: '请登录' })
      })
    }
  } catch (error) {
    res.render('fail', {
      data: JSON.stringify({ message: '请登录' })
    })
  }
};

module.exports = {
  signup,
  list,
  remove,
  signin,
  signout,
  isAuth
}