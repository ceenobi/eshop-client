import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const validateDiscount = (quantity, subTotal, discountCode, token) => {
  return http.post(
    `/discount/${merchantCode}/validate/${quantity}/${subTotal}`,
    discountCode,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  validateDiscount,
};
