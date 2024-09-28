const CardProductSkeleton = () => {
  return (
    <div className="w-[170px] h-[200px] bg-slate-100 shadow-lg rounded-xl p-2 animate-pulse">
      <div className="w-full h-[130px] bg-gray-300 rounded-xl m-auto"></div>
      <div className="w-full h-[20px] mt-2 bg-gray-300 rounded"></div>
      <div className="w-full flex justify-between items-center mt-2">
        <div className="w-1/2 h-[18px] bg-gray-300 rounded"></div>
        <div className="p-1 w-[20px] h-[20px] bg-gray-300 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default CardProductSkeleton;
