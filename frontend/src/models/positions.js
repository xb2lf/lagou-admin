import http from "../utils/http";

export const positionsList = async () => {
  try {
    const { result } = await http({
      url: "/api/positions/list",
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const positionsAdd = () => {
  return new Promise((resolve, reject) => {
    const options = {
      url: "/api/positions/add", //提交地址：默认是form的action,如果申明,则会覆盖
      type: "post", //默认是form的method（get or post），如果申明，则会覆盖
      /* target: "#output",  //把服务器返回的内容放入id为output的元素中 */
      dataType: "json", //html(默认), xml, script, json...接受服务端返回的类型
      headers: {
        'X-Access-Token': localStorage.getItem('lg-token') || ''
      },
      /* clearForm: true,  //成功提交后，是否清除所有表单元素的值 */
      resetForm: true, //成功提交后，是否重置所有表单元素的值
      timeout: 30000, //限制请求的时间，当请求大于3秒后，跳出请求
      /* beforeSubmit: beforeCheck, //提交前的回调函数 */
      success: (result) => { resolve(result) }, //提交成功后的回调函数
      error: (err) => { reject(err) }, //提交失败后的回调函数
    };
    $("#position-form").ajaxSubmit(options);
  })
};

export const positionFindOne = async (id) => {
  try {
    const { result } = await http({
      url: "/api/positions/listone",
      type: 'post',
      data: { id }
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const positionsUpdate = () => {
  return new Promise((resolve, reject) => {
    const options = {
      url: "/api/positions/update", //提交地址：默认是form的action,如果申明,则会覆盖
      type: "patch", //默认是form的method（get or post），如果申明，则会覆盖
      /* target: "#output",  //把服务器返回的内容放入id为output的元素中 */
      dataType: "json", //html(默认), xml, script, json...接受服务端返回的类型
      headers: {
        'X-Access-Token': localStorage.getItem('lg-token') || ''
      },
      /* clearForm: true,  //成功提交后，是否清除所有表单元素的值 */
      resetForm: true, //成功提交后，是否重置所有表单元素的值
      timeout: 30000, //限制请求的时间，当请求大于3秒后，跳出请求
      /* beforeSubmit: beforeCheck, //提交前的回调函数 */
      success: (result) => { resolve(result) }, //提交成功后的回调函数
      error: (err) => { reject(err) }, //提交失败后的回调函数
    };
    $("#position-form-update").ajaxSubmit(options);
  })
}
