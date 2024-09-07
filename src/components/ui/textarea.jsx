/* eslint-disable react/prop-types */

const Textarea = ({ name, placeholder, value, onChange, color, size }) => {
  return (
    <textarea
      className={`w-full border outline-none ${inputSize[size]} ${inputColor[color]} text-gray-700`}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows="5"
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

export default Textarea;
