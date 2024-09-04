import { useState } from "react";

export default function useHandleInput(initialState) {
  const [data, setData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
