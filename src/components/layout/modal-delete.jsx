/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import Button from "../ui/button";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/react/shallow";

const ModalDelete = ({ handleDelete }) => {
  const [isModalDelete, setIsModalDelete] = useAppStore(
    useShallow((state) => [state.isModalDelete, state.setIsModalDelete])
  );

  if (!isModalDelete) return null;

  return (
    <div className="bg-modal ">
      <div className="w-[85%] h-[350px] bg-slate-100 shadow-md lg:w-[400px] rounded-lg">
        <div className="w-full flex justify-end p-2">
          <button onClick={() => setIsModalDelete(false)}>
            <IoMdClose size={25} color="black" />
          </button>
        </div>
        <div className="w-full h-[80%] mt-1  flex flex-col justify-center items-center gap-3 text-center">
          <img src="/trash2.png" alt="icons" className="w-[120px]" />
          <h1 className="w-[90%] text-[1rem] lg:text-[1.1rem]">
            Are you sure you want to delete this item?
          </h1>
          <div className="w-full flex flex-col items-center lg:flex-row lg:justify-center gap-4">
            <Button
              teks={"Yes, delete"}
              type={"button"}
              size={"small"}
              color={"red"}
              func={handleDelete}
            />
            <Button
              teks={"No, Cancel"}
              type={"button"}
              size={"small"}
              color={"light"}
              func={() => setIsModalDelete(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
