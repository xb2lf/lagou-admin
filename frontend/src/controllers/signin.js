import signinTpl from '../views/signin.art';
import { signin as signinModel } from '../models/signin';


const htmlSigin = signinTpl({});

const _handleSubmit = (router) => {
  return async (e) => {
    e.preventDefault();
    // 提交表单
    const data = $('#signin').serialize();
    const { res, jqXHR } = await signinModel(data);
    if (res.ret) {
      const token = jqXHR.getResponseHeader('X-Access-Token');
      localStorage.setItem('lg-token', token);
      router.go('/index/users');
    }
  }
}

const signin = (router) => {
  return (req, res, next) => {
    res.render(htmlSigin)
    $('#signin').on('submit', _handleSubmit(router))
  }
};

export default signin