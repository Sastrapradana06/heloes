/* eslint-disable react/prop-types */

import Input from "../../../components/ui/input";
import { TbListSearch } from "react-icons/tb";
import Button from "../../../components/ui/button";
import {
  useDataProducts,
  useTopSelling,
} from "../../../services/useDataProducts";
import AppTemplate from "../../../components/template/app-template";
import CardPopularProduct from "../../../components/layout/cardPopularProduct";
import CardProduct from "../../../components/layout/cardProduct";
import CardProductSkeleton from "../../../components/layout/cardProductSkeleton";

export default function Home() {
  const CardPopularProductSkeleton = () => {
    return (
      <div className="w-[220px] h-[90px] rounded-xl shadow-lg bg-slate-100 flex items-center justify-between p-2 animate-pulse">
        <div className="w-[30%] h-full bg-gray-300 rounded-xl"></div>
        <div className="w-[65%]">
          <div className="w-full h-[16px] bg-gray-300 rounded mt-2"></div>
          <div className="w-full flex items-center justify-between mt-2">
            <div className="w-[50px] h-[16px] bg-gray-300 rounded"></div>
            <div className="w-[20px] h-[20px] bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  const { data: products, isLoading } = useDataProducts();
  const { data: topSelling, isLoading: isLoadingTop } = useTopSelling();

  return (
    <AppTemplate isNavbar={true} isBottom={true}>
      <>
        <div className="w-full  flex flex-col lg:flex-row lg:justify-between gap-6 lg:items-center">
          <div className="flex flex-col">
            <h1 className="text-[1.4rem] lg:text-[1.5rem]">Discover, </h1>
            <h1 className="text-[1.1rem] text-gray-600 lg:text-[1.2rem]">
              Our new products
            </h1>
          </div>
          <div className="lg:w-[40%] flex items-center gap-2">
            <Input
              type={"text"}
              name={"search"}
              placeholder={"Search..."}
              color={"white"}
              size={"medium"}
            />
            <button className="p-2 rounded-lg bg-yellow-500">
              <TbListSearch size={25} className="text-white" />
            </button>
          </div>
        </div>
        <div className="w-full mt-8  flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className="w-full h-max lg:w-[50%] ">
            <div className="w-full overflow-x-auto flex items-center gap-6">
              <Button
                type={"button"}
                teks={"All"}
                size={"small"}
                color={"yellow"}
              />
              <Button
                type={"button"}
                teks={"Clothing"}
                size={"small"}
                color={"dark"}
              />
              <Button
                type={"button"}
                teks={"Accessories"}
                size={"small"}
                color={"dark"}
              />
              <Button
                type={"button"}
                teks={"Shoes"}
                size={"small"}
                color={"dark"}
              />
            </div>
            <div className="w-full overflow-x-scroll flex items-center gap-4 mt-4 pb-2  lg:overflow-x-hidden lg:flex-wrap lg:h-[400px] lg:items-start ">
              {isLoading ? (
                <CardProductSkeleton />
              ) : (
                products?.map((items) => (
                  <div key={items.id} className="min-w-[170px]">
                    <CardProduct
                      image={items.image}
                      name={items.name}
                      price={items.price}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full lg:w-[50%] ">
            <h1 className="text-gray-600 text-[1.1rem]">Popular Products</h1>
            <div className="w-full overflow-x-scroll mt-4 flex items-center gap-4 lg:flex-wrap lg:overflow-x-hidden lg:max-h-[400px] lg:items-start lg:justify-center lg:gap-5 ">
              {isLoadingTop ? (
                <CardPopularProductSkeleton />
              ) : (
                topSelling?.map((items) => (
                  <div key={items.id} className="min-w-[220px] lg:w-[45%] ">
                    <CardPopularProduct
                      image={items.image}
                      name={items.name}
                      price={items.price}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    </AppTemplate>
  );
}
