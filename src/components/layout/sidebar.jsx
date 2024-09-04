import { IoCloseSharp } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
// import { GoSignOut } from "react-icons/go";
import { IoStorefrontSharp } from "react-icons/io5";
import { PiHandsClapping } from "react-icons/pi";
import { useShallow } from "zustand/react/shallow";
import ListMenu from "../ui/list-menu";
import { useAppStore } from "../../store";

export default function Sidebar() {
  const [isCategory, setIsCategory] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useAppStore(
    useShallow((set) => [set.isSidebarOpen, set.setIsSidebarOpen])
  );

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      id="drawer-navigation"
      className={`fixed top-0 left-0 z-40 w-64 h-screen  overflow-y-auto transition-transform  bg-slate-500 backdrop-blur-md text-gray-300 ${
        styleSidebar.lg
      }  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      aria-labelledby="drawer-navigation-label"
    >
      <div className="w-full h-[69px] p-4 border-b flex justify-between items-center">
        <div className="w-max h-max flex items-center gap-2">
          <PiHandsClapping
            size={25}
            className="text-purple-300 lg:text-purple-500"
          />
          <h5
            id="drawer-navigation-label"
            className="text-[1.1rem] font-semibold  capitalize tracking-[1px] text-white lg:text-gray-700"
          >
            Heloess
          </h5>
        </div>
        <div className="w-max h-max lg:hidden ">
          <button
            onClick={handleSidebar}
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="w-max h-max "
          >
            <IoCloseSharp size={25} className="text-white lg:text-gray-700" />
          </button>
        </div>
      </div>
      <div className="py-4 overflow-y-auto p-4">
        <ul className="space-y-2 font-medium">
          <li>
            <button
              onClick={() => setIsCategory(!isCategory)}
              type="button"
              className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group   hover:bg-purple-200"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <BiCategoryAlt
                size={25}
                className="text-purple-400 lg:text-purple-700"
              />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white lg:text-gray-700">
                Category
              </span>
              <MdKeyboardArrowDown size={20} />
            </button>
            <ul
              id="dropdown-example"
              className={`${
                isCategory ? "hidden" : ""
              } py-2 space-y-2 transition-transform`}
            >
              <ListMenu link="#" teks="Semua" />
              <ListMenu link="#" teks="Elektronik" />
              <ListMenu link="#" teks="Baju" />
              <ListMenu link="#" teks="Celana" />
            </ul>
          </li>

          <ListMenu
            link="#"
            teks="Store"
            icons1={
              <IoStorefrontSharp
                size={25}
                className="text-purple-400 lg:text-purple-700"
              />
            }
          />

          {/* <li>
            <button
              onClick={async () => signOut()}
              className="flex items-center gap-3 w-full p-2 text-base  transition duration-75 rounded-lg    hover:bg-purple-200 "
            >
              <GoSignOut
                size={25}
                className="text-purple-400 lg:text-purple-700"
              />
              <span className="capitalize text-white lg:text-gray-700">
                Sign Out
              </span>
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

const styleSidebar = {
  lg: "lg:translate-x-0 lg:bg-slate-100 lg:border-r lg:border-slate-300 lg:text-gray-500",
};
