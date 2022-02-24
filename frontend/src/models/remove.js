import http from "../utils/http"

export const remove = async (url, data) => {
  try {
    const { result } = await http({
      url,
      type: 'delete',
      data,
    });
    return result
  } catch (error) {
    console.log(error);
  }
}