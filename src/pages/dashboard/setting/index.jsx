import { useEffect } from "react";
import DashboardTemplate from "../../../components/template/dashboard-template";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import useHandleInput from "../../../hooks/useHandleInput";
import { useUpdateUser, useUserLogin } from "../../../services/useDataUser";
import Textarea from "../../../components/ui/textarea";
import Loading from "../../../components/layout/loading";
import { useInvalidate } from "../../../services/useDataProducts";
import { Alert, useHandleAlert } from "sstra-alert";
import { Signout } from "../../../db/dbService/admin";

export default function Setting() {
  const { data: input, handleChange, editData } = useHandleInput({});

  const { data: user } = useUserLogin();
  const { mutate, isPending } = useUpdateUser();
  const { invalidateListQuery } = useInvalidate();

  const { data: alert, status, handleAlert } = useHandleAlert();

  useEffect(() => {
    if (user) {
      const dataUser = {
        id: user.id,
        avatar: user.user_metadata.avatar,
        username: user.user_metadata.username,
        email: user.email,
        phone: user.user_metadata.phone,
        password: "",
        address: user.user_metadata.address,
      };
      editData(dataUser);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (input.password !== "" && input.password.length < 6) {
      handleAlert("info", "Password must be at least 6 characters");
      return;
    }
    mutate(input, {
      onSuccess: () => {
        handleAlert("success", "Profile updated successfully");
        invalidateListQuery("user");
        Signout();
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
      <h1 className="text-[1.3rem] font-semibold">Setting</h1>
      <div className="w-full mt-3 flex flex-col gap-3 lg:flex-row ">
        <div className="w-full h-max p-2 rounded-md shadow-md bg-slate-100 lg:w-[30%]">
          <h1 className="tracking-[1px] font-semibold text-[1.1rem]">
            Profile
          </h1>
          <div className="w-full flex justify-center items-center">
            <img
              src={input.avatar}
              alt="avatar"
              className="w-[120px] h-[120px] object-cover rounded-full ring-1 ring-black"
            />
          </div>
          <div className="w-full flex flex-col gap-3 mt-4">
            <Input
              name={"username"}
              type="text"
              value={input.username}
              setValue={handleChange}
              color={"transparent"}
              size={"small"}
              placeholder="Username"
              required
            />
            <Input
              name={"email"}
              type="email"
              value={input.email}
              setValue={handleChange}
              color={"transparent"}
              size={"small"}
              placeholder="email"
              required
            />

            <Input
              name={"password"}
              type="password "
              value={input.password}
              setValue={handleChange}
              color={"transparent"}
              size={"small"}
              placeholder="new password"
              required
            />
          </div>
        </div>
        <div className="w-full h-max p-2 rounded-md shadow-md bg-slate-100 lg:w-[60%]">
          <h1 className="tracking-[1px] font-semibold text-[1.1rem]">
            Store Information
          </h1>
          <div className="w-full flex flex-col gap-2 mt-2">
            <div className="w-full">
              <label htmlFor="phone" className="text-[.8rem] text-gray-500">
                Phone number
              </label>
              <Input
                name={"phone"}
                type="text"
                value={input.phone}
                setValue={handleChange}
                color={"transparent"}
                size={"small"}
                placeholder="phone"
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="text-[.8rem] text-gray-500">
                Address Store
              </label>
              <Textarea
                name={"address"}
                placeholder={"address"}
                value={input.address}
                onChange={handleChange}
                color={"transparent"}
                size={"small"}
              />
            </div>
            <Button
              type={"button"}
              teks={"Save"}
              color={"green"}
              size={"small"}
              func={handleSubmit}
            />
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
