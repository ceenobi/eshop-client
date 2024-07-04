import { ActionButton, AuthFormInput, Texts } from "@/components";
import { tryCatchFn, validateFields } from "@/utils";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { useStore, useTitle } from "@/hooks";
import { userService } from "@/api";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [reveal, setReveal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loggedInUser, token, setLoggedInUser } = useStore();
  useTitle(`Edit account ${loggedInUser?.username}`);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: loggedInUser?.username,
      email: loggedInUser?.email,
      currentPassword: "",
      password: "",
    },
  });

  const handleHide = () => {
    setReveal((prevReveal) => !prevReveal);
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordValue = watch("password");
  const currentPasswordValue = watch("currentPassword");

  const onFormSubmit = tryCatchFn(async (credentials) => {
    const response = await userService.updateAccount(credentials, token);
    if (response.status === 200) {
      toast.success(response.data.msg);
      setLoggedInUser(response.data.updatedUser);
    }
  });

  return (
    <Row className="mt-4">
      <Col md={2} lg={4} className="d-none d-md-block"></Col>
      <Col md={7} lg={5} className="mb-4">
        <div className="bg-light border rounded-4 shadow-sm p-3">
          <Texts text="Update Info" className="fw-bold" />
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <AuthFormInput
              type="text"
              id="username"
              name="username"
              label="Username"
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
              label="Email address"
              register={register}
              validateFields={validateFields?.email}
              errors={errors.email}
              placeholder="john@email.com"
              className="mb-3"
            />
            <div className="position-relative">
              <AuthFormInput
                type={reveal ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                label="Current Password"
                register={register}
                errors={errors.password}
                validateFields={
                  currentPasswordValue && validateFields?.currentPassword
                }
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
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                label="New Password"
                register={register}
                errors={errors.password}
                validateFields={passwordValue && validateFields?.password}
                placeholder="**********"
                className="mb-3"
              />
              <Texts
                className="position-absolute top-50 end-0 translate-middle cursor"
                onClick={togglePassword}
                text={showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              />
            </div>
            <ActionButton
              text="Save changes"
              pending={isSubmitting}
              className="w-100 mt-2"
              size="lg"
              disabled={isSubmitting}
              type="submit"
              style={{ backgroundColor: "var(--bg-blue-400)" }}
            />
          </Form>
        </div>
      </Col>
    </Row>
  );
}
