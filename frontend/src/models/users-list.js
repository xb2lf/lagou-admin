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