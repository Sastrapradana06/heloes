/* eslint-disable react/prop-types */

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useHandleInput from "../../hooks/useHandleInput";
import Input from "../ui/input";
import Button from "../ui/button";
import Loading from "./loading";
import { Alert, useHandleAlert } from "sstra-alert";

const AuthForm = ({ formType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: input, handleChange } = useHandleInput({
    name: "",
    email: "sastra@gmail.com",
    password: "123",
  });

  const navigate = useNavigate();
  const { status, data, handleAlert } = useHandleAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAlert("success", "Login Success");
    // setIsLoading(true);
    if (formType == "login") {
      if (input.email == "sastra@gmail.com" && input.password == "123") {
        navigate("/dashboard");
      }
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
          {formType == "login" ? "Sign in" : "Sign up"}
        </h1>
        <form className="mt-2 mb-4" onSubmit={handleSubmit}>
          {formType == "register" && (
            <div className="w-full h-max flex flex-col gap-3 mb-4">
              <label htmlFor="name" className="text-gray-300">
                Masukkan Nama
              </label>
              <Input
                name="name"
                type="text"
                color="transparent"
                size="medium"
                value={input.name}
                setValue={handleChange}
              />
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
              value={input.email}
              setValue={handleChange}
            />
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
              value={input.password}
              setValue={handleChange}
            />
          </div>
          <Button teks="Sign in" type="submit" color="purple" size="medium" />
        </form>
        <div className="flex items-center gap-2  text-[.9rem]">
          <p className="text-gray-300">
            {formType == "login" ? "Belum punya akun?" : "Sudah punya akun?"}
          </p>
          {formType == "login" ? (
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
