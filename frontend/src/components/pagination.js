import usersListPagesTpl from '../views/users-pages.art';
import page from '../databus/page';

const _setPageActive = (index) => {
  $('#users-pages #users-page-list li:not(:first-child,:last-child').eq(index - 1).addClass('active').siblings().removeClass('active');
}

const _pagination = (data, pageSize) => {
  const total = data.length;
  const pageCount = Math.ceil(total / pageSize);
  const pageArray = new Array(pageCount);
  const htmlPage = usersListPagesTpl({ pageArray });
  $('#users-pages').html(htmlPage);
  _setPageActive(page.currPage);
  _bindEvent(data, pageSize);

}

const _bindEvent = (data, pageSize) => {
  // 分页事件绑定
  $('#users-pages').off('click').on('click', '#users-page-list li:not(:first-child,:last-child)', function () {
    const index = $(this).index();
    page.setCurrpage(index);
    $('body').trigger('changeCurrpage', index);
    _setPageActive(index);
  })
  $('#users-pages').on('click', '#users-page-list li:first-child', function () {
    if (page.currPage > 1) {
      page.setCurrpage(page.currPage - 1);
      $('body').trigger('changeCurrpage', page.currPage);
      _setPageActive(page.currPage);
    }
  })
  $('#users-pages').on('click', '#users-page-list li:last-child', function () {
    if (page.currPage < Math.ceil(data.length / pageSize)) {
      page.setCurrpage(page.currPage + 1);
      $('body').trigger('changeCurrpage', page.currPage);
      _setPageActive(page.currPage);
    }
  })
}

export default _pagination