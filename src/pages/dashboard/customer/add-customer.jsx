import { LuImage } from "react-icons/lu";
import DashboardTemplate from "../../../components/template/dashboard-template";
import Button from "../../../components/ui/button";
import useHandleFile from "../../../hooks/useHandleFile";
import { useEffect, useRef, useState } from "react";
import Input from "../../../components/ui/input";
import Textarea from "../../../components/ui/textarea";
import { TiArrowLeft } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import useHandleInput from "../../../hooks/useHandleInput";

import { Alert, useHandleAlert } from "sstra-alert";
import {
  useInvalidate,
  useUpdateProduct,
} from "../../../services/useDataProducts";
import Loading from "../../../components/layout/loading";
import { getDataDbWithKey } from "../../../db/dbService/fetch";
import { useAddUser } from "../../../services/useDataUser";

export default function AddCustomer() {
  const [isLoad, setIsLoad] = useState(false);

  const { isPending, mutate } = useAddUser();
  const { invalidateListQuery } = useInvalidate();
  const updateProduct = useUpdateProduct();

  const fileRef = useRef();
  const { file, handleFile, urlImg, editUrlImg } = useHandleFile();
  const {
    data: input,
    handleChange,
    editData,
    clearInput,
  } = useHandleInput({
    avatar: "",
    username: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    status: "aktif",
  });

  const navigate = useNavigate();
  const { data: alert, status, handleAlert } = useHandleAlert();
  const { id } = useParams();

  const getProductEdit = async () => {
    setIsLoad(true);
    const result = await getDataDbWithKey("products", "id", id);

    if (result) {
      editUrlImg(result.image);
      editData(result);
    } else {
      handleAlert("error", "Product not found");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 2000);
    }
    setIsLoad(false);
  };

  const handleUpload = () => {
    fileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    input.fileImg = file;

    mutate(input, {
      onSuccess: () => {
        handleAlert("success", "Customer added successfully");
        invalidateListQuery("data-customers");
        setTimeout(() => {
          navigate("/dashboard/customer");
        }, 2000);
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("error", "Terjadi kesalahan");
      },
    });

    // if (!id) {
    //   input.fileImg = file;
    //   if (!input.fileImg) {
    //     handleAlert("info", "Please select an image");
    //     return;
    //   }
    //   mutate(input, {
    //     onSuccess: () => {
    //       handleAlert("success", "Product added successfully");
    //       invalidateListQuery("data-products");
    //       setTimeout(() => {
    //         navigate("/dashboard/products");
    //       }, 2000);
    //     },
    //     onError: (error) => {
    //       console.log({ error });
    //       handleAlert("error", "Terjadi kesalahan");
    //     },
    //   });
    // } else {
    //   updateProduct.mutate(input, {
    //     onSuccess: () => {
    //       handleAlert("success", "Product updated successfully");
    //       invalidateListQuery("data-products");
    //       setTimeout(() => {
    //         navigate("/dashboard/products");
    //       }, 2000);
    //     },
    //     onError: (error) => {
    //       console.log({ error });
    //       handleAlert("error", "Terjadi kesalahan");
    //     },
    //   });
    // }
  };

  useEffect(() => {
    if (id) {
      getProductEdit();
    }
  }, []);

  return (
    <DashboardTemplate>
      <>
        <Alert
          status={status}
          type={alert.type}
          message={alert.message}
          background={"bg-gray-600"}
        />
        {(isPending || updateProduct.isPending || isLoad) && <Loading />}
      </>
      <div className="flex items-center gap-2">
        <Link to="/dashboard/customer">
          <TiArrowLeft size={25} className="text-black" />
        </Link>
        <h1 className="text-[1.3rem] font-semibold">Add Customer</h1>
      </div>
      <div className="w-full  mt-5 flex flex-col  lg:flex-row-reverse gap-3 mb-10 lg:mb-0">
        <div className="w-full h-max p-3 rounded-lg shadow-md bg-slate-100 lg:w-[35%] lg:p-3">
          <p className="text-[.8rem] lg:text-[.9rem]  ">Upload Avatar</p>
          {urlImg == "" ? (
            <div className="w-[75%] h-[250px] border-dashed border-gray-500 border rounded-lg mt-3 lg:w-full flex justify-center items-center flex-col mb-3">
              <LuImage size={20} className="text-gray-500" />
              <p className="text-gray-700 text-[.8rem]">Upload avatar</p>
              <p className="text-[.6rem] text-gray-500">JPG, PNG, JPEG</p>
            </div>
          ) : (
            <img
              src={urlImg}
              alt=""
              className="w-[75%] h-[250px] border-dashed border-gray-500 border rounded-lg mt-3 mb-3 object-cover"
            />
          )}

          <input
            type="file"
            className="hidden"
            onChange={handleFile}
            ref={fileRef}
          />
          <Button
            teks={"Choose image"}
            size={"small"}
            color={"yellow"}
            disabled={id ? true : false}
            func={handleUpload}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-max  flex flex-col gap-3 "
        >
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem]">Customer Information</p>
            <div className="w-full mt-2 flex flex-col gap-3">
              <Input
                name={"username"}
                type={"text"}
                placeholder={"Username"}
                value={input.username}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
              <select
                className="w-full border outline-none text-sm px-3 py-2 rounded-lg bg-transparent  focus:border-purple-500 focus:border-2"
                name="gender"
                onChange={handleChange}
                value={input.gender}
              >
                <option value="default">Gender</option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
              </select>

              <Textarea
                name={"address"}
                placeholder={"address"}
                value={input.address}
                onChange={handleChange}
                color={"transparent"}
                size={"small"}
              />
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem] ">Email & Password</p>
            <div className="w-full mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                name={"email"}
                type={"text"}
                placeholder={"Email"}
                value={input.email}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
              <Input
                name={"password"}
                type={"text"}
                placeholder={"Password"}
                value={input.password}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem] ">Phone & Role</p>
            <div className="w-full mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                name={"phone"}
                type={"text"}
                placeholder={"Phone"}
                value={input.phone}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
              <select
                className="w-full border outline-none text-sm px-3 py-2 rounded-lg bg-transparent  focus:border-purple-500 focus:border-2"
                name="role"
                onChange={handleChange}
                value={input.role}
              >
                <option value="default">Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          <div className="w-full mt-4  flex items-center justify-end bg-slate-100 gap-4 fixed bottom-0 left-0 px-4 py-3">
            <Button
              teks={"Cancel"}
              size={"small"}
              color={"light"}
              func={
                !id ? () => clearInput() : () => navigate("/dashboard/products")
              }
            />
            <Button
              teks={"Add Customer"}
              size={"small"}
              color={"blue"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </DashboardTemplate>
  );
}
