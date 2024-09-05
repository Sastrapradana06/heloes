/* eslint-disable react/prop-types */
export default function CountCard({ icons, count, title }) {
  return (
    <div className="w-full flex  gap-2 bg-slate-100 rounded-xl px-6 py-4 shadow-md ">
      <span
        className={`w-max h-max p-2 rounded-full 
        ${
          title == "Products"
            ? "bg-yellow-500"
            : title == "Orders"
            ? "bg-blue-500"
            : "bg-green-500"
        }
        `}
      >
        {icons}
      </span>
      <div className="">
        <h1 className="text-2xl">
          {title == "Revenue" ? "Rp. " : ""}
          {count.toLocaleString("id-ID")}
        </h1>
        <p className="text-gray-500 text-[.8rem]">Total {title}</p>
      </div>
    </div>
  );
}
