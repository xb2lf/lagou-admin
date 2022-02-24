import usersTpl from '../../views/users.art';
import usersListTpl from '../../views/users-list.art';
import _pagination from '../../components/pagination';
import page from '../../databus/page';
import { addUser } from './add-user';
import { remove } from '../common';
import { usersList as usersListModel } from '../../models/users';
import { auth as authModel } from '../../models/auth';

let state = {
  dataList: []
};

const _list = (pageNo) => {
  let start = (pageNo - 1) * page.pageSize;
  $('#users-list').html(usersListTpl({
    data: state.dataList.slice(start, start + page.pageSize)
  }));
}

const _loadData = async () => {
  const result = await usersListModel();
  if (result.ret) {
    state.dataList = result.data;
    // 分页
    _pagination(result.data, page.pageSize);
    // 数据渲染
    _list(page.currPage);
  }
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
  const loadIndex = async (res, next) => {
    // 填充用户列表
    next();
    res.render(usersTpl({}));
    $('#add-user-btn').on('click', addUser)
    // 初次渲染list
    await _loadData();
    // 删除事件绑定
    remove('#users-list', '/api/users', _loadData, state);// 传递一个引用类型的值state，为的是在删除组件里能实时获取数据条数
    // 订阅事件
    _subscribe();

  };
  return async (req, res, next) => {
    const result = await authModel();
    if (result.ret) {
      loadIndex(res, next)
    } else {
      router.go('/signin')
    }
  };
}

export default index