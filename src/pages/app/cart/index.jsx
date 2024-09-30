import { IoIosArrowBack } from "react-icons/io";
import AppTemplate from "../../../components/template/app-template";
import { Link } from "react-router-dom";
import { CiCircleMinus } from "react-icons/ci";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Cart() {
  const CardList = () => {
    return (
      <div className="w-full min-h-[100px]   flex items-center justify-between p-1 border-b bg-slate-100 rounded-lg shadow-lg">
        <img
          src="/hoddie.jpeg"
          alt="img"
          className="w-[25%] h-full object-cover rounded-xl"
        />
        <div className="w-[50%] h-full ">
          <h1 className="text-[.9rem] ">Hoddie cowo</h1>
          <p className="text-gray-500 text-[.8rem] -mt-1 mb-4">black, xl</p>
          <p className="">Rp. 100.000</p>
        </div>
        <div className="w-[20%] h-full  flex justify-center items-center gap-2">
          <button className="">
            <CiCircleMinus size={25} />
          </button>
          <span>1</span>
          <button className="">
            <AiFillPlusCircle size={25} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <AppTemplate isNavbar={true} isBottom={false}>
      <div className="w-full  flex flex-col lg:flex-row lg:justify-between ">
        <div className="w-full flex items-center justify-between lg:hidden">
          <Link to="/app">
            <IoIosArrowBack size={25} color="black" />
          </Link>
          <div className="w-[55%]">
            <h1 className="text-[1.3rem] font-semibold tracking-[1px]">Cart</h1>
          </div>
        </div>
        <div className="w-full lg:w-[50%] m-auto ">
          <div className="w-full h-[320px] pb-3 mt-6  overflow-y-scroll flex flex-col gap-4 lg:mt-0 lg:h-[440px]">
            <CardList />
            <CardList />
            <CardList />
            <CardList />
            <CardList />
          </div>
        </div>
        <div className="w-full h-[200px] fixed bottom-0 left-0 right-0 shadow-lg bg-slate-100 lg:static lg:w-[40%]">
          <div className="w-full h-max flex flex-col gap-2 mt-1 px-2 ">
            <div className="w-full flex justify-between items-center p-2 border-b border-dashed border-gray-400">
              <p className="text-[.8rem]">Order Amount</p>
              <h1 className="text-[.9rem]">Rp. 300.000</h1>
            </div>
            <div className="w-full flex justify-between items-center p-2 border-b border-dashed border-gray-400">
              <p className="text-[.8rem]">Order Amount</p>
              <h1 className="text-[.9rem]">Rp. 300.000</h1>
            </div>
            <div className="w-full flex justify-between items-center p-2 ">
              <p className="text-[.8rem]">Order Amount</p>
              <h1 className="text-[.9rem]">Rp. 300.000</h1>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0 flex justify-center">
            <button className="w-[80%] h-[50px] bg-gray-900 hover:bg-yellow-600 text-white rounded-2xl mb-1 lg:mb-2 lg:w-[50%]">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </AppTemplate>
  );
}
