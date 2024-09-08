/* eslint-disable react/prop-types */

const Input = ({ name, type, placeholder, color, size, value, setValue }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      required={true}
      className={`w-full border outline-none ${inputSize[size]} ${inputColor[color]} `}
    />
  );
};

const inputSize = {
  small: "text-sm px-3 py-2 rounded-lg",
  medium: "text-base py-3 px-4 border rounded-xl",
  large: "text-lg px-6 py-3 rounded-2xl",
};

const inputColor = {
  transparent: "bg-transparent  focus:border-purple-500 focus:border-2 ",
  white: "bg-white  focus:border-purple-500 focus:border-2 ",
};

export default Input;
