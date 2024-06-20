import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const getShippingAmt = (state) => {
  return http.get(`/shipping/${merchantCode}/get/${state}/amount`);
};

export default {
  getShippingAmt,
};
