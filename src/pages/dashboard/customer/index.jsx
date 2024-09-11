import DashboardTemplate from "../../../components/template/dashboard-template";
import { useEffect, useState } from "react";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { CiSearch } from "react-icons/ci";

import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { useDataCustomers } from "../../../services/useDataCustomers";
import Loading from "../../../components/layout/loading";
import { formatDate } from "../../../utils";

export default function Customer() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";

  const { data: customers, isFetching } = useDataCustomers();

  const handleSearch = () => {
    searchParams.set("query", q);
    setSearchParams(searchParams);
  };

  const handleFilterChangeStatus = (e) => {
    const status = e.target.value;
    if (status === "semua") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!customers) return;
    let dataCustomers = customers;
    if (query) {
      setQ(query);
      dataCustomers = dataCustomers.filter((customer) => {
        const name = customer.username
          .toLowerCase()
          .includes(query.toLowerCase());
        const email = customer.email
          .toLowerCase()
          .includes(query.toLowerCase());
        return name || email;
      });
    }
    if (status) {
      dataCustomers = dataCustomers.filter((customer) => {
        return customer.status == status;
      });
    }

    setData(dataCustomers);
  }, [customers, query, status]);

  return (
    <DashboardTemplate>
      {isFetching && <Loading />}
      <div className="w-full  mt-1 lg:mt-0">
        <h1 className="text-[1.3rem] font-semibold">Customer</h1>
        <div className="w-full h-max rounded-lg bg-slate-100 shadow-md mt-5 px-1 py-2 lg:p-3">
          <div className="w-full flex flex-col gap-4 lg:flex-row-reverse lg:justify-between lg:items-center">
            <div className="w-full flex items-center gap-2 lg:w-[40%] lg:gap-4">
              <Input
                type={"text"}
                placeholder={"Search in customer"}
                name={"search"}
                size={"small"}
                value={q}
                setValue={(e) => setQ(e.target.value)}
                color={"transparent"}
              />
              <Button
                type={"button"}
                size={"small"}
                color={"purple"}
                icons={<CiSearch size={20} color="white" />}
                func={handleSearch}
              />
            </div>
            <div className=" h-max lg:w-max borderr">
              <select
                id="select"
                className="block  py-2 pl-3 pr-10 text-[.8rem] bg-transparent border rounded-md border-gray-400"
                onChange={handleFilterChangeStatus}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Filter berdasarkan status
                </option>
                <option value="semua">Semua</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
                            src={item.avatar}
                            alt="cover"
                            className="w-[35px] h-[40px] object-cover rounded-md"
                          />
                          <div className="">
                            <p>{item.username}</p>
                            <p className="text-gray-500 text-[.7rem]">
                              {item.email}
                            </p>
                          </div>
                        </div>
                      </th>

                      <td className="px-3 py-4">{item.phone}</td>
                      <td className="px-3 py-4">
                        <p className="w-[100px]">
                          {formatDate(item.created_at)}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <div className="w-[36px] h-max ">
                          {item.total_order.toLocaleString("id-ID")}
                        </div>
                      </td>
                      <td className="px-2">
                        {item.status == "aktif" ? (
                          <div className="w-[15px] h-[15px] rounded-full bg-green-500 m-auto lg:ml-5"></div>
                        ) : (
                          <div className="w-[15px] h-[15px] rounded-full bg-red-500 m-auto lg:ml-5"></div>
                        )}
                      </td>

                      <th scope="row" className="px-4 py-4">
                        {item.status == "aktif" ? (
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
