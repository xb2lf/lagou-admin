import http from "../utils/http"

export const signin = async (data) => {
  try {
    const { result: res, jqXHR } = await http({
      url: '/api/users/signin',
      type: 'post',
      data,
    });
    return { res, jqXHR }
  } catch (error) {
    console.log(error);
  }
}