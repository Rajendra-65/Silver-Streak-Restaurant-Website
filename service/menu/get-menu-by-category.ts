import axios from "axios"

export const getMenuByCategory = async () => {
  const response = await axios.get(`${process.env.PUBLIC_URL}/api/menu-by-category`);
  const Dimsum = response.data.Dimsum;
  const Soup = response.data.Soup;
  const Veg_Starter = response.data.Veg_Starter;
  const Non_Veg_Starter = response.data.Non_Veg_Starter;
  const Sea_Food_Starter = response.data.Sea_Food_Starter;
  const Vegetarian = response.data.Vegetarian;
  const Vegetable = response.data.Vegetable;
  const Chicken = response.data.Chicken;
  const Sea_Food = response.data.Sea_Food;
  const Noodles = response.data.Noodles;
  const Rice =  response.data.Rice;
  return [Dimsum,Soup,Veg_Starter,Non_Veg_Starter,Sea_Food_Starter,Vegetarian,Vegetable,Chicken,Sea_Food,Noodles,Rice]
};