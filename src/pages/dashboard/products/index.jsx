import { CiSearch } from "react-icons/ci";
import DashboardTemplate from "../../../components/template/dashboard-template";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import { MdAdd, MdDelete } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const products = [
    {
      id: 1,
      name: "Celana cowo",
      category: "celana",
      price: 120000,
      stock: 78,
      image: "/celana.jpeg",
    },
    {
      id: 2,
      name: "Hoddie holigans",
      category: "hoddie",
      price: 170000,
      stock: 15,
      image: "/hoddie.jpeg",
    },
    {
      id: 3,
      name: "Kemeja kotak-kotak",
      category: "kemeja",
      price: 135000,
      stock: 25,
      image: "/kemeja.jpeg",
    },
  ];

  const handleSearch = () => {
    setSearchParams({ query: q });
  };

  useEffect(() => {
    if (query) {
      setQ(query);
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      return setData(filteredProducts);
    }
    setData(products);
  }, [query]);

  return (
    <DashboardTemplate>
      <div className="w-full  mt-1 lg:mt-0">
        <h1 className="text-[1.3rem] font-semibold">Products</h1>
        <div className="w-full h-max rounded-lg bg-slate-100 shadow-md mt-5 px-1 py-2 lg:p-3">
          <div className="w-full flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center ">
            <div className="w-max">
              <Link to={"/dashboard/products/add"}>
                <Button
                  teks={"Add Product"}
                  type={"button"}
                  size={"small"}
                  color={"green"}
                  icons={<MdAdd size={20} color="white" />}
                />
              </Link>
            </div>
            <div className="w-full flex items-center gap-2 lg:w-[40%] lg:gap-4">
              <Input
                type={"text"}
                placeholder={"Seacrh in product"}
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
          </div>
          <div className="relative overflow-auto mt-6 min-h-max max-h-[300px]">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-slate-200 border-b">
                <tr>
                  <th scope="col" className="py-3">
                    Id
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Stock
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
                  data.map((item) => (
                    <tr
                      className="hover:bg-slate-200 cursor-pointer  border-b"
                      key={item.id}
                    >
                      <td className="py-4">#{item.id}</td>
                      <th scope="row" className="px-4 py-4">
                        <div className="w-[220px] h-max flex items-center gap-2">
                          <img
                            src={item.image}
                            alt="cover"
                            className="w-[30px] h-[30px] object-cover"
                          />
                          {item.name}
                        </div>
                      </th>
                      <td className="px-3 py-4">
                        <p className="p-2 bg-slate-200 w-max rounded-lg capitalize text-[.8rem]">
                          {item.category}
                        </p>
                      </td>
                      <td className="px-3 py-4">
                        <div className="w-[100px] h-max">
                          Rp. {item.price.toLocaleString("id-ID")}
                        </div>
                      </td>
                      <th scope="row" className="px-4 py-4">
                        <div className="w-max h-max flex items-center gap-2">
                          <button>
                            <LuPencilLine size={20} color="green" />
                          </button>
                          <button>
                            <MdDelete size={20} color="crimson" />
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
