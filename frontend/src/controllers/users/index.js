import indexTpl from '../../views/index.art';
import usersTpl from '../../views/users.art';
import usersListTpl from '../../views/users-list.art';
import _pagination from '../../components/pagination';
import page from '../../databus/page';
import { addUser } from './add-user';
import { usersList as usersListModel } from '../../models/users-list';
import { auth as authModel } from '../../models/auth';
import { usersRemove as userRemoveModel } from '../../models/users-remove';

const htmlIndex = indexTpl({});

let dataList = [];


const _list = (pageNo) => {
  let start = (pageNo - 1) * page.pageSize;
  $('#users-list').html(usersListTpl({
    data: dataList.slice(start, start + page.pageSize)
  }));
}

const _loadData = async () => {
  const result = await usersListModel();
  if (result.ret) {
    dataList = result.data;
    // 分页
    _pagination(result.data, page.pageSize);
    // 数据渲染
    _list(page.currPage);
  }
}

const _methods = () => {
  // 删除事件绑定
  $('#users-list').on('click', '.remove', async function () {
    const data = { id: $(this).data('id') };
    const res = await userRemoveModel(data);
    if (res.ret) {
      _loadData();
      const isLastPage = Math.ceil(dataList.length / page.pageSize) === page.currPage;
      const restOne = dataList.length % page.pageSize === 1;
      const notPageFirst = page.currPage > 0;
      if (isLastPage && restOne && notPageFirst) {
        page.setCurrpage(page.currPage - 1);
      }
    }
  });
  // 登出事件绑定
  $('#users-signout').on('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('lg-token');
    location.reload()
    /* $.ajax({
      url: '/api/users/signout',
      type: 'get',
      dataType: 'json',
      headers: { 'X-Access-Token': localStorage.getItem('lg-token') || '' },
      success(res) {
        if (res.ret) {
          location.reload()
        }
      },
    }) */
  })

}

const _subscribe = () => {
  $('body').on('changeCurrpage', (e, index) => {
    _list(index);
    /* currPage = index; */
  })
  $('body').on('addUser', (e) => {
    _loadData();
  })
}

const index = (router) => {
  const loadIndex = (res) => {
    res.render(htmlIndex)
    // window resize ,让页面撑满屏幕
    $(window, '.wrapper').resize();
    // 填充用户列表
    $('#content').html(usersTpl({}));
    $('#add-user-btn').on('click', addUser)
    // 初次渲染list
    _loadData();
    // 页面事件绑定
    _methods();
    // 订阅事件
    _subscribe();

  };
  return async (req, res, next) => {
    const result = await authModel();
    if (result.ret) {
      loadIndex(res)
    } else {
      router.go('/signin')
    }
  };
}

export default index