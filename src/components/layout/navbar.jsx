import { RiMenu2Line } from "react-icons/ri";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../../store";
import { useUserLogin } from "../../services/useDataUser";

export default function Navbar() {
  const [setIsSidebarOpen] = useAppStore(
    useShallow((set) => [set.setIsSidebarOpen])
  );

  const { data: user, isPending } = useUserLogin();

  return (
    <nav className="w-full h-max p-4 fixed top-0 left-0 z-10 flex items-center gap-3 justify-between border-b border-gray-300 bg-slate-100">
      <div className="w-max h-max ">
        <button
          className="w-max h-max py-2 px-3 rounded-md flex items-center gap-1 bg-purple-200 hover:bg-purple-100 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <RiMenu2Line className="text-purple-500 text-[1.1rem] text-bold " />
        </button>
      </div>
      <div className="w-max h-max flex items-center gap-2">
        <div className="w-max h-max flex flex-col ">
          <p className="text-[1rem] capitalize font-semibold -mb-1 ">
            {isPending ? "" : user?.user_metadata.username}
          </p>
          <span
            className={`text-[.8rem] text-end ${
              user?.user_metadata.role == "super admin"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {isPending ? "" : user?.user_metadata.role}
          </span>
        </div>
        <div className="w-max h-max ">
          <img
            src={isPending ? "" : user?.user_metadata.avatar}
            alt="img_profile"
            className="w-9 h-9 object-cover rounded-lg"
          />
        </div>
      </div>
    </nav>
  );
}
