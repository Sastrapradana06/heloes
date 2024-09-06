import { LuImage } from "react-icons/lu";
import DashboardTemplate from "../../../components/template/dashboard-template";
import Button from "../../../components/ui/button";
import useHandleFile from "../../../hooks/useHandleFile";
import { useRef } from "react";
import Input from "../../../components/ui/input";
import Textarea from "../../../components/ui/textarea";

export default function AddProducts() {
  const fileRef = useRef();
  const { file, handleFile, urlImg } = useHandleFile();

  console.log({ file, urlImg });

  const handleUpload = () => {
    fileRef.current.click();
  };

  return (
    <DashboardTemplate>
      <h1 className="text-[1.3rem] font-semibold">Add Product</h1>
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
              src="/kemeja.jpeg"
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
            teks={"Upload"}
            size={"small"}
            color={"yellow"}
            func={handleUpload}
          />
        </div>
        <div className="w-full h-max  flex flex-col gap-3">
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem]">Product Information</p>
            <div className="w-full mt-2 flex flex-col gap-3">
              <Input
                name={"name"}
                type={"text"}
                placeholder={"Product name"}
                color={"transparent"}
                size={"small"}
              />
              <select
                className="w-full border outline-none text-sm px-3 py-2 rounded-lg bg-transparent  focus:border-purple-500 focus:border-2"
                name="category"
              >
                <option value="default">Category</option>
                <option value="baju">Baju</option>
                <option value="hoddie">Hoddie</option>
                <option value="kemeja">Kemeja</option>
                <option value="celana">Celana</option>
                <option value="sepatu">Sepatu</option>
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
                color={"transparent"}
                size={"small"}
              />
              <Input
                name={"stock"}
                type={"text"}
                placeholder={"Stock"}
                color={"transparent"}
                size={"small"}
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
                color={"transparent"}
                size={"small"}
              />
              <Input
                name={"tags"}
                type={"text"}
                placeholder={"Tags"}
                color={"transparent"}
                size={"small"}
              />
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-slate-100 p-2 lg:p-3 ">
            <p className="text-[.8rem] lg:text-[.9rem] ">Color & Size</p>
            <div className="w-full mt-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <Input
                name={"color"}
                type={"text"}
                placeholder={"red, green, blue"}
                color={"transparent"}
                size={"small"}
              />
              <Input
                name={"size"}
                type={"text"}
                placeholder={"s, l, xl"}
                color={"transparent"}
                size={"small"}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
