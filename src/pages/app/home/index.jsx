/* eslint-disable react/prop-types */
import { AiOutlineProduct } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoHeartCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Input from "../../../components/ui/input";
import { TbListSearch } from "react-icons/tb";
import Button from "../../../components/ui/button";

export default function Home() {
  const ListLink = ({ teks, href }) => {
    return (
      <li className="text-[.9rem] text-gray-700 hover:text-yellow-500 cursor-pointer">
        <Link to={href}>{teks}</Link>
      </li>
    );
  };

  return (
    <main className="w-full min-h-[100vh] max-h-max pb-4 relative ">
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
          <div className="w-full h-[200px] lg:w-[50%] ">
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
          </div>
          <div className="w-full lg:w-[50%] ">
            <h1 className="text-gray-600 text-[1.1rem]">Popular Products</h1>
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
