import http from "../utils/http"

export const usersList = async () => {
  try {
    const { result } = await http({
      url: '/api/users',
    });
    return result
  } catch (error) {
    console.log(error);
  }
}

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