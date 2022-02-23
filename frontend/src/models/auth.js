import http from "../utils/http"

export const auth = async () => {
  try {
    const { result } = await http({
      url: '/api/users/isAuth',
    });
    return result
  } catch (error) {
    console.log(error);
  }
}