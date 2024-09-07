import { useState } from "react";

export default function useHandleInput(initialState) {
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "price" || name == "stock") {
      value = parseInt(value);
    }
    setData({ ...data, [name]: value });
  };

  const clearInput = () => {
    setData(initialState);
  };

  const editData = (state) => {
    setData(state);
  };

  return { data, handleChange, clearInput, editData };
}
