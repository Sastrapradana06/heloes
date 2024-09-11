import { Link, useParams } from "react-router-dom";
import DashboardTemplate from "../../../components/template/dashboard-template";
import { TiArrowLeft } from "react-icons/ti";
import { useAppStore } from "../../../store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import Loading from "../../../components/layout/loading";

export default function DetailOrder() {
  const [data, setData] = useState(null);
  const [orders] = useAppStore(useShallow((state) => [state.orders]));
  const { id } = useParams();

  useEffect(() => {
    if (!orders) return;
    const order = orders.find((order) => order.order_id == id);
    setData(order);
  }, [orders, id]);

  function calculateTotalPrice(order, id) {
    const total = order.products.reduce((sum, product) => {
      return sum + product.price_per_item * product.quantity;
    }, 0);

    if (id) {
      return total.toLocaleString("id-ID");
    }
    return total;
  }

  function calculateTotalPriceWithShipping(data) {
    const totalProducts = data.products.reduce((sum, product) => {
      return sum + product.price_per_item * product.quantity;
    }, 0);

    const totalWithShipping = totalProducts + data.shipping_cost;

    return totalWithShipping.toLocaleString("id-ID");
  }

  function calculateTotalPriceQty(price, qty) {
    const total = price * qty;
    return total.toLocaleString("id-ID");
  }

  return (
    <DashboardTemplate>
      <div className="w-full  mt-1 lg:mt-0">
        {data == null ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Link to="/dashboard/orders">
                <TiArrowLeft size={25} className="text-black" />
              </Link>
              <h1 className="text-[1.1rem] font-semibold">
                Order #{data.order_id}
              </h1>
            </div>
            <div className="w-full h-max p-4 rounded-md shadow-md bg-slate-100 mt-4 lg:p-4">
              <p>Order Information</p>
              <div className="w-full h-max mt-2 flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                <div className="w-max">
                  <p className="text-[.8rem] text-gray-500">Date</p>
                  <p className="text-[.9rem]">{data.order_date}</p>
                </div>
                <div className="w-max">
                  <p className="text-[.8rem] text-gray-500">Items</p>
                  <p className="text-[.9rem]">{data.products.length} items</p>
                </div>
                <div className="w-max">
                  <p className="text-[.8rem] text-gray-500">Status</p>
                  <p
                    className={`w-max
      ${data.order_status === "diproses" ? "bg-yellow-200 text-yellow-700" : ""}
      ${data.order_status === "dikirim" ? "bg-blue-200 text-blue-700" : ""}
      ${data.order_status === "diterima" ? "bg-green-200 text-green-700" : ""}
      ${data.order_status === "gagal" ? "bg-red-200 text-red-700" : ""}
      px-2 py-1 rounded-lg capitalize text-[.8rem]
    `}
                  >
                    {data.order_status}
                  </p>
                </div>
                <div className="w-max">
                  <p className="text-[.8rem] text-gray-500">Payment </p>
                  <p className="text-[.9rem]">{data.payment_method}</p>
                </div>
                <div className="w-max">
                  <p className="text-[.8rem] text-gray-500">Customer</p>
                  <p className="text-[.9rem]">{data.name_customer}</p>
                </div>
                <div className="w-max">
                  <p className="text-[.8rem] text-gray-500">Address</p>
                  <p className="text-[.9rem]">{data.shipping_address}</p>
                </div>
              </div>
            </div>
            <div className="w-full mt-2 p-4 rounded-md shadow-md bg-slate-100">
              <p>Items</p>
              <div className="w-full h-max mt-2 p-1 flex flex-col gap-4">
                {data.products.map((product, i) => (
                  <div
                    className="w-full h-max flex items-center gap-2 lg:gap-4"
                    key={i}
                  >
                    <img
                      src={product.image}
                      alt="img_items"
                      className="w-[35px] h-[40px] rounded-md"
                    />
                    <div className="w-max flex flex-col lg:flex-row   lg:items-center lg:gap-6">
                      <p className="w-full lg:w-[350px] text-[.9rem] lg:text-[1rem] text-gray-600 ">
                        {product.name}
                      </p>
                      <p className="text-[.8rem]  lg:text-[.9rem]  lg:w-[400px]">
                        Rp. {product.price_per_item.toLocaleString("id-ID")}
                        <span className="text-red-500 ml-2 mr-2">*</span>
                        {product.quantity} = Rp.{" "}
                        {calculateTotalPriceQty(
                          product.price_per_item,
                          product.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-max mt-2 p-4 bg-slate-100 rounded-md shadow-md flex flex-col gap-3">
              <div className="w-full h-max flex justify-between items-center">
                <p className="text-[.9rem] lg:text-[1rem] text-gray-500">
                  Subtotal
                </p>
                <p>Rp. {calculateTotalPrice(data, id)}</p>
              </div>
              <div className="w-full h-max flex justify-between items-center">
                <p className="text-[.9rem] lg:text-[1rem] text-gray-500">
                  Ongkir
                </p>
                <p>Rp. {data.shipping_cost.toLocaleString("id-ID")}</p>
              </div>
              <div className="w-full h-max flex justify-between items-center">
                <p className="text-[.9rem] lg:text-[1rem] text-gray-500">
                  Total
                </p>
                <p className="text-green-500">
                  Rp. {calculateTotalPriceWithShipping(data)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardTemplate>
  );
}
