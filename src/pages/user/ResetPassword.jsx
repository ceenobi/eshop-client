import { userService } from "@/api";
import { useTitle } from "@/hooks";
import { tryCatchFn, validateFields } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import styles from "../pages.module.css";
import { ActionButton, AuthFormInput, Texts } from "@/components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthLayout } from "@/layouts";

export default function ResetPassword() {
  useTitle("Reset your password");
  const [reveal, setReveal] = useState(false);
  const [revealB, setRevealB] = useState(false);
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleHide = () => {
    setReveal((prevReveal) => !prevReveal);
  };
  const handleHideB = () => {
    setRevealB((prevReveal) => !prevReveal);
  };

  const onFormSubmit = tryCatchFn(async (credentials) => {
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { status, data } = await userService.resetPassword(userId, token, {
      password: credentials.password,
    });
    if (status === 200) {
      toast.success(data.msg);
      navigate("/login");
    }
  });

  return (
    <AuthLayout caption="Reset your password">
      <Form
        className={`${styles.form} mx-auto`}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div className="position-relative">
          <AuthFormInput
            type={reveal ? "text" : "password"}
            id="password"
            name="password"
            label="Password (required)"
            register={register}
            errors={errors.password}
            validateFields={validateFields?.password}
            placeholder="**********"
            className="mb-3"
          />
          <Texts
            className="position-absolute top-50 end-0 translate-middle cursor"
            role="button"
            onClick={handleHide}
            text={reveal ? <FaRegEyeSlash /> : <FaRegEye />}
          />
        </div>
        <div className="position-relative">
          <AuthFormInput
            type={revealB ? "text" : "password"}
            id="password"
            name="confirmPassword"
            label="Confirm Password (required)"
            register={register}
            errors={errors.confirmPassword}
            validateFields={validateFields?.password}
            placeholder="**********"
            className="mb-3"
          />
          <Texts
            className="position-absolute top-50 end-0 translate-middle cursor"
            role="button"
            onClick={handleHideB}
            text={revealB ? <FaRegEyeSlash /> : <FaRegEye />}
          />
        </div>
        <ActionButton
          text="Reset"
          pending={isSubmitting}
          className="w-100 mt-2"
          style={{ backgroundColor: "var(--bg-blue-400)" }}
          size="lg"
          disabled={isSubmitting}
          type="submit"
        />
      </Form>
    </AuthLayout>
  );
}
