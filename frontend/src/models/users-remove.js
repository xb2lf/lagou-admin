import http from "../utils/http"

export const usersRemove = async (data) => {
  try {
    const { result } = await http({
      url: '/api/users',
      type: 'delete',
      data,
    });
    return result
  } catch (error) {
    console.log(error);
  }
}