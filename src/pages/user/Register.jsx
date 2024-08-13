import { ActionButton, AuthFormInput, Texts } from "@/components";
import { useStore } from "@/hooks";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../pages.module.css";
import { tryCatchFn, validateFields } from "@/utils";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userService } from "@/api";
import { toast } from "react-toastify";
import { AuthLayout } from "@/layouts";

export default function Register() {
  const [reveal, setReveal] = useState(false);
  const { setToken } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleHide = () => {
    setReveal((prevReveal) => !prevReveal);
  };

  const onFormSubmit = tryCatchFn(async (credentials) => {
    const { status, data } = await userService.register(credentials);
    if (status === 201) {
      setToken(data.accessToken);
      toast.success(data.msg);
      navigate(from);
    }
  });
  return (
    <AuthLayout caption="Get your Footsy account">
      <Form
        className={`${styles.form} mx-auto`}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <AuthFormInput
          type="text"
          id="username"
          name="username"
          label="Username (required)"
          register={register}
          validateFields={validateFields?.username}
          errors={errors.username}
          placeholder=""
          className="mb-3"
        />
        <AuthFormInput
          type="email"
          id="email"
          name="email"
          label="Email address (required)"
          register={register}
          validateFields={validateFields?.email}
          errors={errors.email}
          placeholder="john@email.com"
          className="mb-3"
        />
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
            onClick={handleHide}
            text={reveal ? <FaRegEyeSlash /> : <FaRegEye />}
          />
        </div>
        <ActionButton
          text="Get Started"
          pending={isSubmitting}
          className="w-100 mt-2"
          size="lg"
          disabled={isSubmitting}
          style={{ backgroundColor: "var(--bg-blue-400)" }}
          type="submit"
        />
      </Form>
      <br />
      <hr />
      <br />
      <div className="text-center">
        <Texts
          text="Already have an account?"
          size="1.2rem"
          className="fw-semibold mb-0"
          color="var(--bg-zinc-700)"
        />
        <ActionButton
          text="Proceed to Login"
          className={`mt-3 text-white p-2 ${styles.form}`}
          variant="dark"
          as={Link}
          to="/login"
        />
      </div>
    </AuthLayout>
  );
}
