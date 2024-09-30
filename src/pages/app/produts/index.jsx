import { useSearchParams } from "react-router-dom";
import AppTemplate from "../../../components/template/app-template";
import Button from "../../../components/ui/button";

import Input from "../../../components/ui/input";
import { TbListSearch } from "react-icons/tb";
import { useDataProducts } from "../../../services/useDataProducts";
import { useEffect, useState } from "react";
import CardProduct from "../../../components/layout/cardProduct";
import CardProductSkeleton from "../../../components/layout/cardProductSkeleton";
export default function AppProducts() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data, isLoading } = useDataProducts();

  const handleNavigate = (category) => {
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!data) return;
    let dataProducts = data;

    if (category) {
      dataProducts = dataProducts.filter(
        (product) =>
          product.category.toLowerCase() === category.toLocaleLowerCase()
      );
    }

    setProducts(dataProducts);
  }, [data, category]);

  return (
    <AppTemplate isNavbar={true} isBottom={true}>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="w-full flex items-center gap-2 lg:w-[40%]">
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
          <div className="w-full overflow-x-auto flex items-center gap-6 lg:overflow-x-hidden lg:w-max">
            <Button
              type={"button"}
              teks={"All"}
              size={"small"}
              color={category === null ? "yellow" : "dark"}
              func={() => handleNavigate("all")}
            />
            <Button
              type={"button"}
              teks={"Clothing"}
              size={"small"}
              color={category === "clothing" ? "yellow" : "dark"}
              func={() => handleNavigate("clothing")}
            />
            <Button
              type={"button"}
              teks={"Shoes"}
              size={"small"}
              color={category === "shoes" ? "yellow" : "dark"}
              func={() => handleNavigate("shoes")}
            />
            <Button
              type={"button"}
              teks={"Accessories"}
              size={"small"}
              color={category === "accessories" ? "yellow" : "dark"}
              func={() => handleNavigate("accessories")}
            />
          </div>
        </div>
        <div className="w-full h-max mt-6  flex flex-wrap gap-3 justify-center lg:gap-4">
          {isLoading ? (
            <CardProductSkeleton />
          ) : (
            products?.map((items) => (
              <CardProduct
                key={items.id}
                image={items.image}
                name={items.name}
                price={items.price}
              />
            ))
          )}
        </div>
      </div>
    </AppTemplate>
  );
}
