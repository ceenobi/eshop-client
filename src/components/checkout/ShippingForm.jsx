import { Badge, Form } from "react-bootstrap";
import styles from "../../pages/pages.module.css";
import { useForm } from "react-hook-form";
import { useStore } from "@/hooks";
import Texts from "../Texts";
import { AuthFormInput } from "../FormInputs";
import { state, validateFields } from "@/utils";
import ActionButton from "../ActionButton";
import { useEffect } from "react";

const country = [
  { label: "Select Country", code: "Country (required)", id: 0 },
  { label: "Nigeria", code: "Nigeria", id: 1 },
];

export default function ShippingForm({ step, setStep }) {
  const { setShippingDetails, shippingDetails } = useStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (shippingDetails) {
      setValue("fullname", shippingDetails?.fullname);
      setValue("address", shippingDetails?.address);
      setValue("phone", shippingDetails?.phone);
      setValue("state", shippingDetails?.state);
      setValue("country", shippingDetails?.country);
    }
  }, [shippingDetails, setValue]);

  const saveShippingInfo = (data) => {
    setShippingDetails(data);
    setStep((prev) => prev + 1);
  };

  return (
    <Form
      className={`${styles.form} mt-4 mx-auto`}
      onSubmit={handleSubmit(saveShippingInfo)}
    >
      <Texts
        text={
          <>
            {" "}
            <Badge pill bg="primary">
              {step}
            </Badge>
            {""} - Shipping details
          </>
        }
        size="1.2rem"
        className="fw-semibold text-center"
        color="var(--bg-zinc-700)"
      />
      <AuthFormInput
        type="text"
        id="fullname"
        name="fullname"
        label="Fullname(required)"
        register={register}
        validateFields={validateFields?.fullname}
        errors={errors.fullname}
        placeholder="john doe"
        className="mb-3"
      />
      <AuthFormInput
        type="text"
        id="address"
        name="address"
        label="Address(required)"
        register={register}
        validateFields={validateFields?.address}
        errors={errors.address}
        placeholder="address"
        className="mb-3"
      />
      <AuthFormInput
        type="tel"
        id="phone"
        name="phone"
        label="Phone(required)"
        register={register}
        validateFields={validateFields?.phone}
        errors={errors.phone}
        placeholder="Enter phone no"
        className="mb-3"
      />
      <Form.Group controlId={"state"} className="w-100 mb-3">
        <Form.Select
          aria-label="Default select state"
          {...register("state", validateFields?.state)}
          defaultValue={""}
          isInvalid={!!errors.state}
          style={{ height: "57px" }}
        >
          {state?.map((item, i) => (
            <option
              value={i === 0 ? "" : item.code}
              key={item.id}
              disabled={i === 0}
            >
              {item.label}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid" className="text-start">
          {errors?.state?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId={"country"} className="w-100 mb-3">
        <Form.Select
          aria-label="Default select country"
          {...register("country", validateFields.country)}
          isInvalid={!!errors.country}
          defaultValue={"Nigeria"}
          style={{ height: "57px" }}
        >
          {country?.map((item, i) => (
            <option
              value={i === 0 ? "" : item.code}
              key={item.id}
              disabled={i === 0}
            >
              {item.label}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid" className="text-start">
          {errors?.country?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <ActionButton
        text="Next"
        pending={isSubmitting}
        className="w-100 mt-3"
        size="lg"
        disabled={isSubmitting}
        type="submit"
        style={{ backgroundColor: "var(--bg-blue-400)" }}
      />
    </Form>
  );
}
