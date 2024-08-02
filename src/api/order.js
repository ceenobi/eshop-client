import { http } from "@/utils";
const merchantCode = import.meta.env.VITE_TEEM_MERCHANT_CODE;

const checkoutSummary = (checkoutDetails, token) => {
  return http.post(`/order/${merchantCode}/checkout`, checkoutDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createOrder = (orderSummary, token) => {
  return http.post(`/order/${merchantCode}/create`, orderSummary, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllClientOrders = async (userId, page = 1) => {
  return await http.get(`/order/${merchantCode}/all/${userId}?page=${page}`);
};

const getASingleOrder = (orderId) => {
  return http.get(`/order/${merchantCode}/get/${orderId}`);
};

const updatePaymentInfo = (orderId, isPaid, token) => {
  return http.patch(`/order/${merchantCode}/update/${orderId}`, isPaid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const cancelOrder = (orderId, token) => {
  return http.delete(`/order/${merchantCode}/cancel/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  checkoutSummary,
  createOrder,
  getAllClientOrders,
  getASingleOrder,
  updatePaymentInfo,
  cancelOrder,
};
