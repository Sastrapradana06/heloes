import { useShallow } from "zustand/react/shallow";
import DashboardTemplate from "../../../components/template/dashboard-template";
import { useAppStore } from "../../../store";
import { useEffect, useState } from "react";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { CiSearch } from "react-icons/ci";

import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";

export default function Customer() {
  const [data, setData] = useState([]);

  const [customers] = useAppStore(useShallow((state) => [state.customers]));

  useEffect(() => {
    setData(customers);
  }, [customers]);

  return (
    <DashboardTemplate>
      <div className="w-full  mt-1 lg:mt-0">
        <h1 className="text-[1.3rem] font-semibold">Customer</h1>
        <div className="w-full h-max rounded-lg bg-slate-100 shadow-md mt-5 px-1 py-2 lg:p-3">
          <div className="w-full flex lg:flex-row-reverse">
            <div className="w-full flex items-center gap-2 lg:w-[40%] lg:gap-4">
              <Input
                type={"text"}
                placeholder={"Search in customer"}
                name={"search"}
                size={"small"}
                // value={q}
                // setValue={(e) => setQ(e.target.value)}
                color={"transparent"}
              />
              <Button
                type={"button"}
                size={"small"}
                color={"purple"}
                icons={<CiSearch size={20} color="white" />}
                // func={handleSearch}
              />
            </div>
          </div>
          <div className="relative overflow-auto mt-6 min-h-max max-h-[450px]">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-slate-200 border-b">
                <tr>
                  <th scope="col" className="pl-1 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Created
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Order
                  </th>
                  <th scope="col" className="px-2">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-4">
                      <div className="w-full h-max flex flex-col items-center justify-center">
                        <p>No Data</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((item, i) => (
                    <tr
                      className="hover:bg-slate-200 cursor-pointer  border-b"
                      key={i + 1}
                    >
                      <td className="pl-1 py-4">#{i + 1}</td>
                      <th scope="row" className="px-4 py-4">
                        <div className="w-[200px] h-max flex items-center gap-2">
                          <img
                            src={item.image}
                            alt="cover"
                            className="w-[35px] h-[40px] object-cover rounded-md"
                          />
                          <div className="">
                            <p>{item.name}</p>
                            <p className="text-gray-500 text-[.7rem]">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </th>

                      <td className="px-3 py-4">{item.phone}</td>
                      <td className="px-3 py-4">
                        <p className="w-[80px]">{item.created_at}</p>
                      </td>
                      <td className="px-3 py-4">
                        <div className="w-[36px] h-max ">
                          {item.orders.toLocaleString("id-ID")}
                        </div>
                      </td>
                      <td className="px-2">
                        {item.status == "active" ? (
                          <div className="w-[15px] h-[15px] rounded-full bg-green-500 m-auto lg:ml-5"></div>
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-red-500 m-auto lg:ml-5"></div>
                        )}
                      </td>

                      <th scope="row" className="px-4 py-4">
                        {item.status == "active" ? (
                          <button
                            className="p-2 rounded-md bg-red-500"
                            title="non aktifkan akun"
                          >
                            <IoLockOpenOutline size={20} color="white" />
                          </button>
                        ) : (
                          <button
                            className="p-2 rounded-md bg-green-500"
                            title="aktifkan akun"
                          >
                            <IoLockClosedOutline size={20} color="white" />
                          </button>
                        )}
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
