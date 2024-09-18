/* eslint-disable react/prop-types */

const Button = ({ teks, icons, type, color, size, disabled, func }) => {
  return (
    <button
      className={`w-max ${buttonColor[color]} ${buttonSize[size]}  duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
      type={type}
      onClick={func}
      disabled={disabled}
    >
      {icons}
      {teks}
    </button>
  );
};

const buttonColor = {
  purple: "bg-purple-500 hover:bg-purple-600 text-white",
  blue: "bg-blue-500 hover:bg-blue-600 text-white",
  red: "bg-red-500 hover:bg-red-600 text-white",
  green: "bg-green-500 hover:bg-green-600 text-white",
  yellow: "bg-yellow-500 hover:bg-yellow-600 text-white",
  dark: "bg-gray-800 hover:bg-gray-900 text-white",
  light: "bg-slate-200 tex-black hover:bg-slate-300",
};

const buttonSize = {
  small: "text-sm px-3 py-2 rounded-lg",
  medium: "text-base px-4 py-2 rounded-xl",
  large: "text-lg px-7 py-3 rounded-2xl",
};

export default Button;
