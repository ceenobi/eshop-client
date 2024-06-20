import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const getAllProducts = (page) => {
  return http.get(`/product/${merchantCode}/all?page=${page}`);
};
const getNewProducts = (page) => {
  return http.get(`/product/${merchantCode}/get/new?page=${page}`);
};

const getBestSellerProducts = (page) => {
  return http.get(`/product/${merchantCode}/get/best-seller?page=${page}`);
};

const getAProduct = (slug) => {
  return http.get(`/product/${merchantCode}/get/${slug}`);
};
const getRecommendedProducts = (slug) => {
  return http.get(`/product/${merchantCode}/get/${slug}/recommended`);
};

const getProductsByCategory = (category, page) => {
  return http.get(`/product/${merchantCode}/${category}/get?page=${page}`);
};

const searchProducts = (query) => {
  return http.get(`/product/${merchantCode}/search?q=${query}`);
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
