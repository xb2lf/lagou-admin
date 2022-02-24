import http from "../utils/http"

export const positionsList = async () => {
  try {
    const { result } = await http({
      url: '/api/positions/list',
    });
    return result
  } catch (error) {
    console.log(error);
  }
}

export const positionsAdd = async (data) => {
  try {
    const { result } = await http({
      url: '/api/positions/add',
      type: 'post',
      data,
    });
    return result
  } catch (error) {
    console.log(error);
  }
}