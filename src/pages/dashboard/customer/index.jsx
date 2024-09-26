import DashboardTemplate from "../../../components/template/dashboard-template";
import { useEffect, useState } from "react";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { CiSearch } from "react-icons/ci";

import { IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "../../../components/layout/loading";
import { formatDate } from "../../../utils";
import {
  useDataUsers,
  useDeleteUser,
  useUpdateStatus,
} from "../../../services/useDataUser";
import { MdAdd } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { useInvalidate } from "../../../services/useDataProducts";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/react/shallow";
import { Alert, useHandleAlert } from "sstra-alert";
import ModalDelete from "../../../components/layout/modal-delete";

export default function Customer() {
  const [data, setData] = useState([]);
  const [idDelete, setIdDelete] = useState(null);
  const [setIsModalDelete] = useAppStore(
    useShallow((state) => [state.setIsModalDelete])
  );

  const { data: alert, status: alertStatus, handleAlert } = useHandleAlert();

  const [q, setQ] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";

  const { data: customers, isFetching } = useDataUsers();
  const { mutate, isPending } = useDeleteUser();
  const updateStatus = useUpdateStatus();
  const { invalidateListQuery } = useInvalidate();

  const handleStatus = (id, status) => {
    updateStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          handleAlert("success", "Status updated successfully");
          invalidateListQuery("data-customers");
        },
        onError: (error) => {
          console.log({ error });
          handleAlert("error", "Terjadi kesalahan");
        },
      }
    );
  };

  const deleteCustomer = () => {
    mutate(idDelete, {
      onSuccess: () => {
        setIsModalDelete(false);
        handleAlert("success", "Customer deleted successfully");
        invalidateListQuery("data-customers");
      },
      onError: (error) => {
        console.log({ error });
        setIsModalDelete(false);
        handleAlert("error", "Terjadi kesalahan");
      },
    });
  };

  const showModal = (id) => {
    setIdDelete(id);
    setIsModalDelete(true);
  };

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
        const name = customer.user_metadata.username
          .toLowerCase()
          .includes(query.toLowerCase());
        const email = customer.user_metadata.email
          .toLowerCase()
          .includes(query.toLowerCase());
        return name || email;
      });
    }
    if (status) {
      dataCustomers = dataCustomers.filter((customer) => {
        return customer.user_metadata.status == status;
      });
    }

    setData(dataCustomers);
  }, [customers, query, status]);

  return (
    <DashboardTemplate>
      <>
        {(isFetching || isPending || updateStatus.isPending) && <Loading />}
        <ModalDelete handleDelete={deleteCustomer} />
        <Alert
          status={alertStatus}
          type={alert.type}
          message={alert.message}
          background={"bg-gray-600"}
        />
      </>
      <div className="w-full  mt-1 lg:mt-0">
        <h1 className="text-[1.3rem] font-semibold">Customer</h1>
        <div className="w-full h-max rounded-lg bg-slate-100 shadow-md mt-5 px-1 py-2 lg:p-3 ">
          <div className="w-full flex flex-col gap-4  ">
            <div className="w-full flex flex-col  lg:items-center lg:justify-between gap-2 lg:w-full lg:flex-row lg:gap-4 ">
              <div className="w-full lg:w-[40%] flex items-center gap-2 ">
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
                  <option value="aktif">Aktif</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="w-max">
              <Link to={"/dashboard/customer/add"}>
                <Button
                  teks={"Add Customer"}
                  type={"button"}
                  size={"small"}
                  color={"green"}
                  icons={<MdAdd size={20} color="white" />}
                />
              </Link>
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
                    Username
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Role
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
                            src={item.user_metadata.avatar}
                            alt="cover"
                            className="w-[35px] h-[40px] object-cover rounded-md"
                          />
                          <div className="">
                            <p>{item.user_metadata.username}</p>
                            <p className="text-gray-500 text-[.7rem]">
                              {item.user_metadata.email}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="px-3 py-4">
                        <p
                          className={`w-[80px] capitalize font-semibold ${
                            item.user_metadata.role == "admin"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.user_metadata.role}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        {item.user_metadata.phone
                          ? item.user_metadata.phone
                          : "-"}
                      </td>
                      <td className="px-3 py-4">
                        <p className="w-[100px]">
                          {formatDate(item.created_at)}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <div className="w-[36px] h-max ">{0}</div>
                      </td>
                      <td className="px-2">
                        {item.user_metadata.status == "aktif" ? (
                          <div
                            className="w-[15px] h-[15px] rounded-full bg-green-500 m-auto lg:ml-5"
                            title="aktif"
                          ></div>
                        ) : (
                          <div
                            className="w-[15px] h-[15px] rounded-full bg-red-500 m-auto lg:ml-5"
                            title="inactive"
                          ></div>
                        )}
                      </td>

                      <th scope="row" className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {item.user_metadata.status == "aktif" ? (
                            <button
                              onClick={() =>
                                handleStatus(item.id, item.user_metadata.status)
                              }
                              className="p-2 rounded-md bg-yellow-500"
                              title="non aktifkan akun"
                            >
                              <IoLockOpenOutline size={20} color="white" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleStatus(item.id, item.user_metadata.status)
                              }
                              className="p-2 rounded-md bg-green-500"
                              title="aktifkan akun"
                            >
                              <IoLockClosedOutline size={20} color="white" />
                            </button>
                          )}
                          <button
                            className="p-2 rounded-md bg-red-500"
                            onClick={() => showModal(item.id)}
                            title="delete akun"
                          >
                            <BiTrash size={20} color="white" />
                          </button>
                        </div>
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
