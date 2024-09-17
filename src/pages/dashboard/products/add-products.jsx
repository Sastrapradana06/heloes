import { LuImage } from "react-icons/lu";
import DashboardTemplate from "../../../components/template/dashboard-template";
import Button from "../../../components/ui/button";
import useHandleFile from "../../../hooks/useHandleFile";
import { useRef } from "react";
import Input from "../../../components/ui/input";
import Textarea from "../../../components/ui/textarea";
import { TiArrowLeft } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import useHandleInput from "../../../hooks/useHandleInput";

import { Alert, useHandleAlert } from "sstra-alert";
import {
  useInvalidate,
  useTambahProduct,
} from "../../../services/useDataProducts";
import Loading from "../../../components/layout/loading";

export default function AddProducts() {
  const { isPending, mutate } = useTambahProduct();
  const { invalidateListQuery } = useInvalidate();

  const fileRef = useRef();
  const { file, handleFile, urlImg } = useHandleFile();
  const {
    data: input,
    handleChange,
    clearInput,
  } = useHandleInput({
    fileImg: "",
    image: "",
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    tags: "",
    color: "",
    size: "",
    sales: 0,
  });

  const navigate = useNavigate();
  const { data: alert, status, handleAlert } = useHandleAlert();

  const handleUpload = () => {
    fileRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    input.fileImg = file;

    mutate(input, {
      onSuccess: () => {
        handleAlert("success", "Product added successfully");
        invalidateListQuery("data-products");
        setTimeout(() => {
          navigate("/dashboard/products");
        }, 2000);
      },
      onError: (error) => {
        console.log({ error });
        handleAlert("error", "Terjadi kesalahan");
      },
    });
  };

  return (
    <DashboardTemplate>
      <>
        <Alert
          status={status}
          type={alert.type}
          message={alert.message}
          background={"bg-gray-600"}
        />
        {isPending && <Loading />}
      </>
      <div className="flex items-center gap-2">
        <Link to="/dashboard/products">
          <TiArrowLeft size={25} className="text-black" />
        </Link>
        <h1 className="text-[1.3rem] font-semibold">Add Product</h1>
      </div>
      <div className="w-full  mt-5 flex flex-col  lg:flex-row-reverse gap-3 ">
        <div className="w-full h-max p-3 rounded-lg shadow-md bg-slate-100 lg:w-[35%] lg:p-3">
          <p className="text-[.8rem] lg:text-[.9rem]  ">Product image</p>
          {urlImg == "" ? (
            <div className="w-[75%] h-[250px] border-dashed border-gray-500 border rounded-lg mt-3 lg:w-full flex justify-center items-center flex-col mb-3">
              <LuImage size={20} className="text-gray-500" />
              <p className="text-gray-700 text-[.8rem]">
                Upload your product image
              </p>
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
            func={handleUpload}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full h-max  flex flex-col gap-3 "
        >
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem]">Product Information</p>
            <div className="w-full mt-2 flex flex-col gap-3">
              <Input
                name={"name"}
                type={"text"}
                placeholder={"Product name"}
                value={input.name}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
              <select
                className="w-full border outline-none text-sm px-3 py-2 rounded-lg bg-transparent  focus:border-purple-500 focus:border-2"
                name="category"
                onChange={handleChange}
              >
                <option value="default">Category</option>
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>

              <Textarea
                name={"description"}
                placeholder={"Description"}
                color={"transparent"}
                size={"small"}
              />
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem] ">Price & Stock</p>
            <div className="w-full mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                name={"price"}
                type={"text"}
                placeholder={"Price"}
                value={input.price}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
              <Input
                name={"stock"}
                type={"text"}
                placeholder={"Stock"}
                value={input.stock}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem] ">Brand & Tags</p>
            <div className="w-full mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                name={"brand"}
                type={"text"}
                placeholder={"Brand"}
                value={input.brand}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
              <Input
                name={"tags"}
                type={"text"}
                placeholder={"Tags"}
                value={input.tags}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                required={true}
              />
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 mb-10 lg:mb-6">
            <p className="text-[.8rem] lg:text-[.9rem] ">
              Variant Color & Size
            </p>
            <div className="w-full mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                name={"color"}
                type={"text"}
                placeholder={"red, green, blue"}
                value={input.color}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
              />
              <Input
                name={"size"}
                type={"text"}
                placeholder={"s, l, xl"}
                value={input.size}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
              />
            </div>
          </div>
          <div className="w-full mt-4  flex items-center justify-end bg-slate-100 gap-4 fixed bottom-0 left-0 px-4 py-3">
            <Button
              teks={"Cancel"}
              size={"small"}
              color={"light"}
              func={clearInput}
            />
            <Button
              teks={"Add product"}
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
