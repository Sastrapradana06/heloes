/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ListMenu = ({ link, teks, icons1 }) => {
  const { pathname } = window.location;

  console.log({ pathname });

  return (
    <li>
      {icons1 ? (
        <li>
          <Link
            to={link}
            className={`flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group   hover:bg-purple-200 ${
              pathname == link ? "bg-purple-200" : ""
            } lg:hover:text-purple-600 text-[.8rem]`}
          >
            {icons1}
            <span className="flex-1 ms-3 whitespace-nowrap capitalize text-white lg:text-gray-700 text-[.9rem]">
              {teks}
            </span>
          </Link>
        </li>
      ) : (
        <Link
          to={link}
          className={`flex items-center w-full p-2  transition duration-75 rounded-lg pl-11 group   hover:text-purple-300 lg:hover:text-purple-600 text-[.8rem]`}
        >
          {teks}
        </Link>
      )}
    </li>
  );
};

export default ListMenu;
