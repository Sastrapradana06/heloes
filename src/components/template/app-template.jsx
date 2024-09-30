/* eslint-disable react/prop-types */
import { AiOutlineProduct } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { IoHeartCircleSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

export default function AppTemplate({ isNavbar, isBottom, children }) {
  const ListLink = ({ teks, href }) => {
    return (
      <li
        className={`text-[.9rem]  cursor-pointer ${
          pathname === href ? "text-yellow-500" : "text-gray-700"
        }`}
      >
        <Link to={href}>{teks}</Link>
      </li>
    );
  };

  const { pathname } = useLocation();

  return (
    <main className="w-full min-h-[100vh] max-h-max pb-[100px] relative lg:pb-5">
      {isNavbar && (
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
              <ListLink teks={"Cart"} href={"/app/cart"} />
              <ListLink teks={"Love"} href={"/app/love"} />
            </ul>
            <img
              src="/profile.jpeg"
              alt="avatar"
              className="w-[40px] h-[40px] object-cover rounded-full "
            />
          </div>
        </nav>
      )}
      <section
        className={`w-full h-max p-3  lg:p-8 ${
          !isNavbar ? "pt-4" : "pt-[85px] lg:pt-[100px]"
        } `}
      >
        {children}
      </section>

      {isBottom && (
        <nav className="w-[90%] h-[63px] bg-gray-800 rounded-3xl fixed bottom-4 left-0 right-0 m-auto lg:hidden p-6 flex justify-between items-center ">
          <Link to={"/app"}>
            <GoHomeFill
              size={30}
              className={`${
                pathname === "/app" ? "text-yellow-500" : "text-white"
              }`}
            />
          </Link>
          <Link to={"/app/products"}>
            <AiOutlineProduct
              size={27}
              className={`${
                pathname === "/app/products" ? "text-yellow-500" : "text-white"
              }`}
            />
          </Link>
          <Link to={"/app/cart"}>
            <BsCart4
              size={25}
              className={`${
                pathname === "/app/cart" ? "text-yellow-500" : "text-white"
              }`}
            />
          </Link>
          <Link>
            <IoHeartCircleSharp
              size={33}
              className="text-white hover:text-yellow-500"
            />
          </Link>
        </nav>
      )}
    </main>
  );
}
