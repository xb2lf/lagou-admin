const { verify } = require('../utils/tools');

const auth = (req, res, next) => {
  const token = req.get('X-Access-Token');
  try {
    const result = verify(token);
    if (result.username) {
      next();
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

exports.auth = auth;