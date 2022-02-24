import positionsTpl from '../../views/positions.art';
import positionsListTpl from '../../views/positions-list.art'
import _pagination from '../../components/pagination';
import page from '../../databus/page';

import { auth as authModel } from "../../models/auth";
import { positionsList as positionsListModel } from '../../models/positions';
import { addPosition } from './add-position';
import { remove } from '../common';

let state = {
  dataList: [],
};

const _list = (pageNo) => {
  let start = (pageNo - 1) * page.pageSize;
  $('#positions-list').html(positionsListTpl({
    data: state.dataList.slice(start, start + page.pageSize)
  }));
}

const _loadData = async () => {
  const { ret, data } = await positionsListModel();
  if (ret) {
    state.dataList = data.list;
    // 分页
    _pagination(data.list, page.pageSize);
    // 数据渲染
    _list(page.currPage);
  }
}

const _subscribe = () => {
  $('body').off('changeCurrpage').on('changeCurrpage', (e, index) => {
    _list(index);
  })
  $('body').off('addPosition').on('addPosition', (e) => {
    _loadData();
  })
}

const listPositions = (router) => {
  return async (req, res, next) => {
    const result = await authModel();
    if (result.ret) {
      next();
      res.render(positionsTpl());
      $('#add-position-btn').on('click', addPosition)
      // 初次渲染list
      await _loadData();
      // 删除事件绑定
      remove('#positions-list', '/api/positions/remove', _loadData, state)
      // 订阅事件
      _subscribe();
    } else {
      router.go('signin')
    }
  }
}

export default listPositions