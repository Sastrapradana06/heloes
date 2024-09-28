/* eslint-disable react/prop-types */
import { LuPlus } from "react-icons/lu";

const CardProduct = ({ image, name, price }) => {
  return (
    <div className="w-[160px] h-[200px] bg-slate-100 shadow-lg rounded-xl p-2">
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

export default CardProduct;
