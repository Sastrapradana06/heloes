import { AiOutlineProduct } from "react-icons/ai";
import DashboardTemplate from "../../components/template/dashboard-template";
import { BsCart4 } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import CountCard from "../../components/layout/count-card";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
export default function Dashboard() {
  const auth = useAuthUser();

  console.log({ auth });

  return (
    <DashboardTemplate>
      <section className="w-full ">
        <div className="w-full flex flex-col gap-4 lg:flex-row items-center">
          <CountCard
            icons={<AiOutlineProduct size={33} className="text-white" />}
            count={112}
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
                <tr className=" hover:bg-gray-700 cursor-pointer hover:text-white border-b">
                  <td className="py-4">#1</td>
                  <th scope="row" className="px-4 py-4  ">
                    <div className="w-[300px] h-max flex items-center gap-2 ">
                      <img
                        src="/celana.jpeg"
                        alt=""
                        className="w-[30px] h-[30px] object-cover"
                      />
                      Celana Cowo keren
                    </div>
                  </th>
                  <td className="px-3 py-4">234</td>
                  <td className="px-3 py-4">Rp. 2.000.000</td>
                </tr>
                <tr className=" hover:bg-gray-700 cursor-pointer hover:text-white border-b">
                  <td className="py-4">#2</td>
                  <th scope="row" className="px-4 py-4  ">
                    <div className="w-[300px] h-max flex items-center gap-2 ">
                      <img
                        src="/hoddie.jpeg"
                        alt=""
                        className="w-[30px] h-[30px] object-cover"
                      />
                      Hoddie Holigans
                    </div>
                  </th>
                  <td className="px-3 py-4">174</td>
                  <td className="px-3 py-4">Rp. 120.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardTemplate>
  );
}
