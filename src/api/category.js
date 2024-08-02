import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const getAllCategories = async () => {
  return await http.get(`/category/${merchantCode}/all`);
};

const getACategory = (categoryId) => {
  return http.get(`/category/${merchantCode}/get/${categoryId}`);
};

export default {
  getAllCategories,
  getACategory,
};
