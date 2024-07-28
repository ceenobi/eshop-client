import { ActionButton, AuthFormInput } from "@/components";
import { useTitle } from "@/hooks";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../pages.module.css";
import { tryCatchFn, validateFields } from "@/utils";
import { toast } from "react-toastify";
import { userService } from "@/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/layouts";

export default function ForgotPassword() {
  useTitle("Forgot your password");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const from = location.search ? location.search.split("=")[1] : "/";

  const onFormSubmit = tryCatchFn(async (credentials) => {
    const { status, data } = await userService.forgotPassword(credentials);
    if (status === 200) {
      toast.success(data.msg);
      navigate(from);
    }
  });

  return (
    <AuthLayout caption="Recover your Footsy account">
      <Form
        className={`${styles.form} mx-auto`}
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <AuthFormInput
          type="email"
          id="email"
          name="email"
          label="Email address (required)"
          register={register}
          validateFields={validateFields?.email}
          errors={errors.email}
          placeholder="john@email.com"
          className="w-100"
        />
        <ActionButton
          text="Verify Email"
          pending={isSubmitting}
          className="w-100 mt-3"
          style={{ backgroundColor: "var(--bg-blue-400)" }}
          size="lg"
          disabled={isSubmitting}
          type="submit"
        />
      </Form>
    </AuthLayout>
  );
}
