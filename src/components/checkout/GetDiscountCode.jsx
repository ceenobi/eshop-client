import { Badge, Form } from "react-bootstrap";
import Texts from "../Texts";
import ActionButton from "../ActionButton";
import { tryCatchFn } from "@/utils";
import { useStore } from "@/hooks";
import { toast } from "react-toastify";
import styles from "../../pages/pages.module.css";
import { useForm } from "react-hook-form";
import { AuthFormInput } from "../FormInputs";
import { discountService } from "@/api";
import { useNavigate } from "react-router-dom";

export default function GetDiscountCode({ step, setStep }) {
  const { setDiscountCode, token, cartQuantity, priceTotal } =
    useStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const goNext = () => {
    setStep((prev) => prev + 1);
    navigate("/checkout/summary");
  };

  const onFormSubmit = tryCatchFn(async (discountCode) => {
    const { status, data } = await discountService.validateDiscount(
      cartQuantity,
      priceTotal,
      discountCode,
      token
    );
    if (status === 200) {
      toast.success(data.msg);
      setDiscountCode(data.discountCode);
    }
  });

  return (
    <div className={`${styles.form} mt-4 mx-auto`}>
      <Texts
        text={
          <>
            {" "}
            <Badge pill bg="danger">
              {step}
            </Badge>
            {""} - Have a Discount code?
          </>
        }
        size="1.2rem"
        className="fw-semibold text-center"
        color="var(--bg-zinc-700)"
      />
      <Texts
        text="If you have one, apply to get discount or click Next to continue"
        size="1rem"
        color="var(--bg-zinc-700)"
        className="text-center"
      />
      <Form className={`mx-auto`} onSubmit={handleSubmit(onFormSubmit)}>
        <AuthFormInput
          type="text"
          id="discountCode"
          name="discountCode"
          label="Discount code"
          register={register}
          className="mb-3"
        />
        <ActionButton
          text="Apply"
          pending={isSubmitting}
          className="w-100 border-0 bg-danger"
          disabled={isSubmitting}
          size="lg"
          type="submit"
        />
      </Form>

      <div className="mt-4 d-flex justify-content-between align-items-center">
        <Texts
          text="Go Back"
          size="1rem"
          color="var(--bg-zinc-700)"
          className="mt-3 fw-semibold cursor"
          onClick={goBack}
        />
        <ActionButton text="Next" onClick={goNext} />
      </div>
    </div>
  );
}
