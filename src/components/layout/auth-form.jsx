/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/input";
import Loading from "./loading";
import { Alert, useHandleAlert } from "sstra-alert";
import Button from "../ui/button";
import {
  comparePassword,
  generateToken,
  hashPassword,
  setCookies,
} from "../../utils";
import { getDataDbWithKey, inserDataDb } from "../../db/dbService";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const AuthForm = ({ formType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const signIn = useSignIn();
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
      .min(6, "Password minimal 3 karakter"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const { name, email, password } = values;
    if (formType === "register") {
      const hashedPassword = await hashPassword(password);
      const data = {
        avatar: "/profile.jpeg",
        username: name,
        email,
        password: hashedPassword,
      };

      const insertData = await inserDataDb("user", data);
      if (!insertData.status) {
        setIsLoading(false);
        handleAlert("error", insertData.message);
        setSubmitting(false);
        return;
      }

      setIsLoading(false);
      handleAlert("success", "Register Success");
      setSubmitting(false);
      navigate("/login");
      return;
    }

    if (formType === "login") {
      const getData = await getDataDbWithKey("user", "email", email);
      if (!getData) {
        setIsLoading(false);
        handleAlert("error", "Email tidak terdaftar");
        setSubmitting(false);
        return;
      }

      const isPasswordMatch = await comparePassword(password, getData.password);
      if (!isPasswordMatch) {
        setIsLoading(false);
        handleAlert("error", "harap masukkan password yang benar");
        setSubmitting(false);
        return;
      }

      const token = generateToken();

      console.log({ getData, token });

      if (
        signIn({
          auth: {
            token: token,
            type: "Bearer",
          },
          refresh: false,
          userState: {
            name: "React User",
            uid: 123456,
          },
        })
      ) {
        setCookies("idUser", getData.id);
        handleAlert("success", "Login berhasil");
        navigate("/dashboard");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        return handleAlert("error", "Login gagal");
      }

      setIsLoading(false);
    }
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
            email: formType === "login" ? "sastra@gmail.com" : "",
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
