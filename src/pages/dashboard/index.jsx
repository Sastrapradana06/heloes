import { AiOutlineProduct } from "react-icons/ai";
import DashboardTemplate from "../../components/template/dashboard-template";
import { BsCart4 } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import CountCard from "../../components/layout/count-card";
import { useDataProducts, useTopSelling } from "../../services/useDataProducts";
export default function Dashboard() {
  const { data, isFetching } = useTopSelling();
  const { data: products } = useDataProducts();

  return (
    <DashboardTemplate>
      <section className="w-full ">
        <div className="w-full flex flex-col gap-4 lg:flex-row items-center">
          <CountCard
            icons={<AiOutlineProduct size={33} className="text-white" />}
            count={products ? products.length : 0}
            title={"Products"}
          />
          <CountCard
            icons={<BsCart4 size={33} className="text-white" />}
            count={361}
            title={"Orders"}
          />
          <CountCard
            icons={<IoWalletOutline size={33} className="text-white" />}
            count={100000}
            title={"Revenue"}
          />
        </div>
        <div className="w-full mt-6 bg-slate-100 rounded-lg shadow-md p-3">
          <h1 className="text-lg font-semibold">Top selling products</h1>
          <div className="relative overflow-auto  mt-3  min-h-max max-h-[300px]">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-transparent border-b">
                <tr>
                  <th scope="col" className="py-3">
                    Id
                  </th>
                  <th scope="col" className="px-4 py-3  ">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Sales
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {isFetching && <div>Loading...</div>}
                {data?.length === 0 && <div>No data</div>}
                {data?.map((item) => (
                  <tr
                    className=" hover:bg-gray-700 cursor-pointer hover:text-white border-b"
                    key={item.id}
                  >
                    <td className="py-4">#{item.id}</td>
                    <th scope="row" className="px-4 py-4  ">
                      <div className="w-[300px] h-max flex items-center gap-2 ">
                        <img
                          src={item.image}
                          alt=""
                          className="w-[30px] h-[30px] object-cover"
                        />
                        {item.name}
                      </div>
                    </th>
                    <td className="px-3 py-4">{item.sales}</td>
                    <td className="px-3 py-4">
                      Rp. {item.price.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardTemplate>
  );
}
