import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const getAllProducts = async(page = 1) => {
  return await http.get(`/product/${merchantCode}/all?page=${page}`);
};
const getNewProducts = async (page = 1) => {
  return await http.get(`/product/${merchantCode}/get/new?page=${page}`);
};

const getBestSellerProducts = async (page = 1) => {
  return await http.get(
    `/product/${merchantCode}/get/best-seller?page=${page}`
  );
};

const getAProduct = async (slug) => {
  return await http.get(`/product/${merchantCode}/get/${slug}`);
};

const getRecommendedProducts = async (slug) => {
  return await http.get(`/product/${merchantCode}/get/${slug}/recommended`);
};

const getProductsByCategory = async (category, page = 1) => {
  return await http.get(
    `/product/${merchantCode}/${category}/get?page=${page}`
  );
};

const searchProducts = async (query) => {
  return await http.get(`/product/${merchantCode}/search?q=${query}`);
};

export default {
  getAllProducts,
  getNewProducts,
  getAProduct,
  getBestSellerProducts,
  getProductsByCategory,
  getRecommendedProducts,
  searchProducts,
};
