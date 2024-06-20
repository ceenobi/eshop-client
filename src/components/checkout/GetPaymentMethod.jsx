import { Badge } from "react-bootstrap";
import Texts from "../Texts";
import ActionButton from "../ActionButton";
import { useStore } from "@/hooks";
import styles from "../../pages/pages.module.css";
import { IoMdCash } from "react-icons/io";
import { FaPaypal } from "react-icons/fa6";
import { SiPicpay } from "react-icons/si";

const paymentMethods = [
  {
    id: 1,
    name: "Pay on delivery",
    Icon: IoMdCash,
    color: "green",
  },
  {
    id: 2,
    name: "Paypal",
    Icon: FaPaypal,
    color: "blue",
  },
  {
    id: 3,
    name: "Paystack",
    Icon: SiPicpay,
    color: "skyblue",
  },
];

export default function GetPaymentMethod({ step, setStep }) {
  const { paymentMethod, setPaymentMethod } = useStore();

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const goNext = () => {
    setStep((prev) => prev + 1);
  };

  const selectPaymentMethod = (name) => {
    setPaymentMethod(name);
  };

  return (
    <div className={`${styles.form} mt-4 mx-auto`}>
      <Texts
        text={
          <>
            {" "}
            <Badge pill bg="warning">
              {step}
            </Badge>
            {""} - Select payment method
          </>
        }
        size="1.2rem"
        className="fw-semibold text-center"
        color="var(--bg-zinc-700)"
      />
      <div>
        {paymentMethods.map(({ id, Icon, name, color }) => (
          <div
            key={id}
            className={`p-3 text-center mb-3 border rounded-3 cursor ${
              paymentMethod === name ? "border-black" : ""
            }`}
            onClick={() => selectPaymentMethod(name)}
          >
            <Icon size="24px" color={color} />
            <span className="mx-1">{name}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 d-flex justify-content-between align-items-center">
        <Texts
          text="Go Back"
          size="1rem"
          color="var(--bg-zinc-700)"
          className="mt-3 fw-semibold cursor"
          onClick={goBack}
        />
        <ActionButton text="Next" disabled={!paymentMethod} onClick={goNext} />
      </div>
    </div>
  );
}
