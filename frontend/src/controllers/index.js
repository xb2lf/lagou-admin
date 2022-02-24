import indexTpl from '../views/index.art';
import { auth as authModel } from '../models/auth';
import img from '../assets/user2-160x160.jpg';
import pageHeader from '../components/pageheader';
import page from '../databus/page';

const index = (router) => {

  const _render = (res, next) => {
    const htmlIndex = indexTpl({ subRouter: res.subRoute(), img });
    next(htmlIndex);
    const $as = $('#sidebar-menu li:not(:first-child) a');
    const hash = location.hash;
    $as.filter(`[href = "${hash}"]`).parent().addClass('active').siblings().removeClass('active');
    //是否重置page
    if (hash !== page.currRoute) {
      page.reset()
    }
    // 当前url保存
    page.setCurrRoute(hash);
    // 登出事件绑定
    $('#users-signout').off('click').on('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('lg-token');
      location.reload()
    })
  }
  return async (req, res, next) => {
    const result = await authModel();
    if (result.ret) {
      _render(res, next);
      // window resize ,让页面撑满屏幕
      $(window, '.wrapper').resize();
      // 加载页面导航
      pageHeader();
    } else {
      router.go('/signin')
    }
  };
}

export default index