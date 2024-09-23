/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";

const ListMenu = ({ link, teks, icons1 }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [setIsSidebarOpen] = useAppStore(
    useShallow((set) => [set.setIsSidebarOpen])
  );

  const handleSidebar = () => {
    setIsSidebarOpen(false);
    return navigate(link);
  };

  return (
    <li>
      {icons1 ? (
        <li>
          <button
            onClick={handleSidebar}
            className={`flex  items-center  w-full p-2 text-base  transition duration-75 rounded-lg   hover:bg-purple-200 ${
              pathname == link ? "bg-purple-200" : ""
            } lg:hover:text-purple-600 text-[.8rem]`}
          >
            {icons1}
            <span className="ms-3 capitalize text-white lg:text-gray-700 text-[.9rem]">
              {teks}
            </span>
          </button>
        </li>
      ) : (
        <button
          onClick={handleSidebar}
          className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group    text-[.8rem] capitalize ${
            search.includes(teks) ? "text-purple-400" : ""
          }`}
        >
          {teks}
        </button>
      )}
    </li>
  );
};

export default ListMenu;
