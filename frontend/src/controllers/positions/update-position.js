import positionsUpdateTpl from '../../views/positions-update.art';
import positionsUpdateFormTpl from '../../views/positions-update-form.art';
import page from '../../databus/page';
import { positionFindOne as positionFindOneModel, positionsUpdate as positionsUpdateModel } from '../../models/positions';


// 职位编辑
export const updatePosition = () => {
  $('#positions-list-box').after(positionsUpdateTpl());
  const _save = async () => {
    try {
      const res = await positionsUpdateModel();
      if (res.ret) {
        page.setCurrpage(page.currPage);
        // 告知list页面要重新渲染
        $('body').trigger('addPosition');
      }
      $('#positions-close-update').click();
    } catch (error) {
      console.log(error);
    }
  }
  $('#positions-save-update').off('click').on('click', _save);
}

export const fillPositionsUpdateTpl = async (id) => {
  const result = await positionFindOneModel(id);
  if (result.ret) {
    const data = result.data.data;
    $('#position-form-update').html((positionsUpdateFormTpl({ data })));
  }
}