import http from "../utils/http"

export const usersAdd = async (data) => {
  try {
    const { result } = await http({
      url: '/api/users',
      type: 'post',
      data,
    });
    return result
  } catch (error) {
    console.log(error);
  }
}