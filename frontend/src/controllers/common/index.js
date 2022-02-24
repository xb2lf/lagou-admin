import page from '../../databus/page';
import * as removeModel from '../../models/remove';

export const remove = (box, url, loadData, state) => {
  // 删除事件绑定
  $(box).off('click').on('click', '.remove', async function () {
    const data = { id: $(this).data('id') };
    const res = await removeModel.remove(url, data);
    const length = state.dataList.length;
    if (res.ret) {
      loadData();
      const isLastPage = Math.ceil(length / page.pageSize) === page.currPage;
      const restOne = length % page.pageSize === 1;
      const notPageFirst = page.currPage > 0;
      if (isLastPage && restOne && notPageFirst) {
        page.setCurrpage(page.currPage - 1);
      }
    }
  });
}