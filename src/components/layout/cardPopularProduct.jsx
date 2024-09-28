import { IoHeart } from "react-icons/io5";

/* eslint-disable react/prop-types */
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

export default CardPopularProduct;
