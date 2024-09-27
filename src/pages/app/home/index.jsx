/* eslint-disable react/prop-types */
import { AiOutlineProduct } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoHeart, IoHeartCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/input";
import { TbListSearch } from "react-icons/tb";
import Button from "../../../components/ui/button";
import { LuPlus } from "react-icons/lu";
import {
  useDataProducts,
  useTopSelling,
} from "../../../services/useDataProducts";

export default function Home() {
  const ListLink = ({ teks, href }) => {
    return (
      <li className="text-[.9rem] text-gray-700 hover:text-yellow-500 cursor-pointer">
        <Link to={href}>{teks}</Link>
      </li>
    );
  };

  const CardProduct = ({ image, name, price }) => {
    return (
      <div className="w-[170px] h-[200px] bg-slate-100 shadow-lg rounded-xl p-2">
        <img
          src={image}
          alt="img_items"
          className="w-full h-[130px] rounded-xl object-cover m-auto"
        />
        <h1 className="text-[.8rem] text-yellow-500 font-semibold mt-2 capitalize">
          {name}
        </h1>
        <div className="w-full flex justify-between items-center">
          <p className="text-[.8rem] ">Rp. {price.toLocaleString("id-ID")}</p>
          <button className="p-1 rounded-full bg-gray-600 shadow-lg">
            <LuPlus size={18} color="white" />
          </button>
        </div>
      </div>
    );
  };

  const CardPopularProduct = ({ image, name, price }) => {
    return (
      <div className="w-[220px] h-[90px] rounded-xl shadow-lg bg-slate-100 flex items-center justify-between p-2 lg:w-full">
        <img
          src={image}
          alt="img"
          className="w-[30%] h-full rounded-xl object-cover"
        />
        <div className="w-[65%]">
          <h1 className="text-[.8rem] text-yellow-500 font-semibold mt-2 capitalize">
            {name}
          </h1>
          <div className="w-full flex items-center justify-between mt-2">
            <p className="text-[.8rem] ">Rp. {price.toLocaleString("id-ID")}</p>
            <button className="">
              <IoHeart size={20} fill="black" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CardProductSkeleton = () => {
    return (
      <div className="w-[170px] h-[200px] bg-slate-100 shadow-lg rounded-xl p-2 animate-pulse">
        <div className="w-full h-[130px] bg-gray-300 rounded-xl m-auto"></div>
        <div className="w-full h-[20px] mt-2 bg-gray-300 rounded"></div>
        <div className="w-full flex justify-between items-center mt-2">
          <div className="w-1/2 h-[18px] bg-gray-300 rounded"></div>
          <div className="p-1 w-[20px] h-[20px] bg-gray-300 rounded-full shadow-lg"></div>
        </div>
      </div>
    );
  };

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
    <main className="w-full min-h-[100vh] max-h-max pb-[100px] relative ">
      <nav className="w-full h-[70px] p-3 fixed top-0 left-0  bg-[#ffffff49] backdrop-blur-[5px] flex items-center justify-between lg:p-8">
        <div className="w-max">
          <h1 className="lg:text-[1.1rem] font-semibold">
            <span className="text-yellow-500">Hello</span>, Welcome back
          </h1>
        </div>
        <div className="w-max  lg:flex lg:items-center gap-10">
          <ul className="hidden lg:flex gap-6">
            <ListLink teks={"Home"} href={"/app"} />
            <ListLink teks={"Products"} href={"/app/products"} />
            <ListLink teks={"Charts"} href={"/app/charts"} />
            <ListLink teks={"Love"} href={"/app/love"} />
          </ul>
          <img
            src="/profile.jpeg"
            alt="avatar"
            className="w-[40px] h-[40px] object-cover rounded-full "
          />
        </div>
      </nav>
      <section className="w-full h-max p-3  lg:p-8 pt-[85px] lg:pt-[100px]">
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
      </section>
      <nav className="w-[90%] h-[63px] bg-gray-800 rounded-3xl fixed bottom-4 left-0 right-0 m-auto lg:hidden p-6 flex justify-between items-center ">
        <Link>
          <GoHomeFill size={30} className="text-white hover:text-yellow-500" />
        </Link>
        <Link>
          <AiOutlineProduct
            size={27}
            className="text-white hover:text-yellow-500"
          />
        </Link>
        <Link>
          <BsCart4 size={25} className="text-white hover:text-yellow-500" />
        </Link>
        <Link>
          <IoHeartCircleSharp
            size={33}
            className="text-white hover:text-yellow-500"
          />
        </Link>
      </nav>
    </main>
  );
}
