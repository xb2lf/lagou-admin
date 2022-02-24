import positionsAddTpl from '../../views/positions-add.art';
import page from '../../databus/page';
import { positionsAdd as positionsAddModel } from '../../models/positions';


// 职位添加
export const addPosition = () => {
  $('#positions-list-box').after(positionsAddTpl());
  const _save = async () => {
    const formbody = $('#position-form').serialize();
    const res = await positionsAddModel(formbody);
    if (res.ret) {
      page.setCurrpage(1);
      // 告知list页面要重新渲染
      $('body').trigger('addPosition');
    }
    $('#positions-close').click();
  }
  $('#positions-save').off('click').on('click', _save)
}