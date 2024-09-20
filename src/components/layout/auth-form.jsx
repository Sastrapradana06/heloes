/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/input";
import Loading from "./loading";
import { Alert, useHandleAlert } from "sstra-alert";
import Button from "../ui/button";

import { Login, SignUp } from "../../db/dbService/auth";
import { saveTokensToCookies, setCookies } from "../../utils";

const AuthForm = ({ formType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { status, data, handleAlert } = useHandleAlert();

  const validationSchema = Yup.object().shape({
    name:
      formType === "register"
        ? Yup.string().required("Name tidak boleh kosong")
        : null,
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email tidak boleh kosong"),
    password: Yup.string()
      .required("Password tidak boleh kosong")
      .min(6, "Password minimal 6 karakter"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const { name, email, password } = values;

    if (formType === "register") {
      const dataUser = {
        email: email,
        password: password,
        username: name,
        avatar: "/profile.jpeg",
        role: "customer",
      };
      const register = await SignUp(dataUser);
      if (!register.status) {
        setIsLoading(false);
        handleAlert("error", register.message);
        setSubmitting(false);
        return;
      }
      console.log({ register });
      navigate("/login");
    }

    if (formType === "login") {
      const { status, session } = await Login(email, password);
      console.log({ status, session });

      if (!status) {
        setIsLoading(false);
        handleAlert("error", "Harap periksa kembali email dan password anda");
        setSubmitting(false);
        return;
      }
      saveTokensToCookies(session.access_token, session.expires_at);
      setCookies("user_role", session.user.user_metadata.role);
      handleAlert("success", "Login Success");
      setSubmitting(false);
      navigate("/dashboard");
    }

    setSubmitting(false);
    setIsLoading(false);
  };

  return (
    <>
      <>
        <Alert
          status={status}
          type={data.type}
          message={data.message}
          background={"bg-slate-100"}
        />
        {isLoading && <Loading />}
      </>
      <div className="w-full h-max">
        <h1 className="font-bold text-[1.5rem]">
          {formType === "login" ? "Sign in" : "Sign up"}
        </h1>
        <Formik
          initialValues={{
            name: "",
            email: formType === "login" ? "klimandai6@gmail.com" : "",
            password: formType === "login" ? "123456" : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form className="mt-2 mb-4">
              {formType === "register" && (
                <div className="w-full h-max flex flex-col gap-3 mb-4">
                  <label htmlFor="name" className="text-gray-300">
                    Masukkan Nama
                  </label>
                  <Input
                    name="name"
                    type="text"
                    color="transparent"
                    size="medium"
                    value={values.name}
                    setValue={handleChange}
                  />
                  {errors.name && touched.name ? (
                    <p className="text-red-500 text-[.9rem]">{errors.name}</p>
                  ) : null}
                </div>
              )}
              <div className="w-full h-max flex flex-col gap-3">
                <label htmlFor="email" className="text-gray-300">
                  Masukkan email
                </label>
                <Input
                  name="email"
                  type="email"
                  color="transparent"
                  size="medium"
                  value={values.email}
                  setValue={handleChange}
                />
                {errors.email && touched.email ? (
                  <p className="text-red-500 text-[.9rem]">{errors.email}</p>
                ) : null}
              </div>
              <div className="w-full h-max flex flex-col gap-3 mt-4 mb-3">
                <label htmlFor="password" className="text-gray-300">
                  Masukkan password
                </label>
                <Input
                  name="password"
                  type="password"
                  color="transparent"
                  size="medium"
                  value={values.password}
                  setValue={handleChange}
                />
                {errors.password && touched.password ? (
                  <p className="text-red-500 text-[.9rem]">{errors.password}</p>
                ) : null}
              </div>
              <Button
                teks="Sign in"
                type="submit"
                color="purple"
                size="medium"
              />
            </Form>
          )}
        </Formik>
        <div className="flex items-center gap-2  text-[.9rem]">
          <p className="text-gray-300">
            {formType === "login" ? "Belum punya akun?" : "Sudah punya akun?"}
          </p>
          {formType === "login" ? (
            <Link to={"/register"}>Sign up</Link>
          ) : (
            <Link to={"/login"}>Sign in</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
