import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const getTaxRate = (state) => {
  return http.get(`/tax/${merchantCode}/get/${state}/rate`);
};

export default {
  getTaxRate,
};
