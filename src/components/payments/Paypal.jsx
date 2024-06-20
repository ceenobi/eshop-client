import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Loader from "../Loader";

export default function Paypal({ total, updatePayment }) {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };
  const style = { layout: "vertical" };

  const createPaypalOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Your purchase details",
            amount: {
              value: total / 100,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function () {
      updatePayment(data.orderID);
    });
  };

  const ButtonWrapper = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {isPending ? <Loader /> : null}
        <PayPalButtons
          style={style}
          createOrder={createPaypalOrder}
          onApprove={onApprove}
          forceReRender={[total, style]}
        />
      </>
    );
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <ButtonWrapper showSpinner={false} />
    </PayPalScriptProvider>
  );
}
