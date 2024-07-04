import { useStore } from "@/hooks";
import { PaystackButton } from "react-paystack";
import { toast } from "react-toastify";

export default function Paystack({ order, updatePayment }) {
  const { loggedInUser } = useStore();
  const config = {
    reference: new Date().getTime().toString(),
    email: loggedInUser.email,
    amount: order.total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const handlePaystackSuccessAction = (reference) => {
    console.log(reference);
    updatePayment(reference.reference);
  };

  const handlePaystackCloseAction = () => {
    toast.info("Ended Paystack session");
  };

  const componentProps = {
    ...config,
    metadata: {
      name: order?.shippingDetails?.fullname,
      phoneNumber: order?.shippingDetails?.phone,
    },
    text: "Click to pay",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
    className: "border-0 bg-info text-white w-100 p-2 rounded-3 fw-medium",
  };

  return <PaystackButton {...componentProps} />;
}
