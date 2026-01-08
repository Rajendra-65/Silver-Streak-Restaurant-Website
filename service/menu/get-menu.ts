// server file
import axios from "axios"


export const getMenu = async () => {
  const resposne = await axios.get(`${process.env.PUBLIC_URL}/api/menu`)
  return resposne.data.menu
};
