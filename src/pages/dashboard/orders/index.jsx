import { useShallow } from "zustand/react/shallow";
import DashboardTemplate from "../../../components/template/dashboard-template";
import { useAppStore } from "../../../store";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/button";
import { CiSearch } from "react-icons/ci";
import Input from "../../../components/ui/input";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

export default function Orders() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [orders] = useAppStore(useShallow((state) => [state.orders]));
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";
  const query = searchParams.get("query") || "";

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
    let dataOrders = orders;
    if (query) {
      dataOrders = dataOrders.filter((order) => {
        const order_id = order.order_id == query;
        const name = order.name_customer
          .toLowerCase()
          .includes(query.toLowerCase());

        return order_id || name;
      });
    }
    if (status) {
      dataOrders = dataOrders.filter((item) => item.order_status == status);
    }

    setData(dataOrders);
  }, [orders, status, query]);

  return (
    <DashboardTemplate>
      <div className="w-full  mt-1 lg:mt-0">
        <h1 className="text-[1.3rem] font-semibold">Orders</h1>
        <div className="w-full h-max rounded-lg bg-slate-100 shadow-md mt-5 px-1 py-2 lg:p-3">
          <div className="w-full flex flex-col gap-4 lg:flex-row-reverse lg:justify-between lg:items-center">
            <div className="w-full flex items-center gap-2 lg:w-[40%] lg:gap-4">
              <Input
                type={"text"}
                placeholder={"Search in orders"}
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

                <option value="diproses">Diproses</option>
                <option value="dikirim">Dikirim</option>
                <option value="diterima">Diterima</option>
                <option value="gagal">Gagal</option>
              </select>
            </div>
          </div>
          <div className="relative overflow-auto mt-6 min-h-max max-h-[450px]">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-slate-200 border-b">
                <tr>
                  <th scope="col" className="pl-1 py-3">
                    Order Id
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Products
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Price
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
                      <td className="px-2 py-4 ">#{item.order_id}</td>
                      <th scope="row" className="px-4 py-4">
                        <div className="w-[180px] h-max flex items-center gap-2">
                          <p>{item.name_customer}</p>
                        </div>
                      </th>

                      <td className="px-3 py-4">
                        {item.products.length + 1} items
                      </td>
                      <td className="px-3 py-4">
                        <p className="w-[100px] text-green-500">
                          Rp. {item.total_price.toLocaleString("id-ID")}
                        </p>
                      </td>
                      <td className="px-2">
                        <p
                          className={`w-max
      ${item.order_status === "diproses" ? "bg-yellow-200 text-yellow-700" : ""}
      ${item.order_status === "dikirim" ? "bg-blue-200 text-blue-700" : ""}
      ${item.order_status === "diterima" ? "bg-green-200 text-green-700" : ""}
      ${item.order_status === "gagal" ? "bg-red-200 text-red-700" : ""}
      px-2 py-1 rounded-lg capitalize
    `}
                        >
                          {item.order_status}
                        </p>
                      </td>

                      <th scope="row" className="px-4 py-4">
                        <button
                          className="p-1 rounded-md bg-yellow-500 ml-2"
                          title="detail"
                        >
                          <IoArrowRedoSharp size={20} color="white" />
                        </button>
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
