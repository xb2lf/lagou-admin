import userAddTpl from '../../views/users-add.art';
import page from '../../databus/page';
import { usersAdd as usersAddModel } from '../../models/users-add';

// 添加用户
export const addUser = () => {
  const html = userAddTpl();
  $('#users-list-box').after(html);

  // 提交表单
  const _save = async () => {
    const data = $('#users-form').serialize();
    const res = await usersAddModel(data);
    if (res.ret) {
      page.setCurrpage(1);
      // 告知list页面要重新渲染
      $('body').trigger('addUser');
    }

    // 点击关闭模态框
    const $btnClose = $('#users-close');
    $btnClose.click();
  }
  // 点击保存，提交表单
  $('#users-save').on('click', _save);
}