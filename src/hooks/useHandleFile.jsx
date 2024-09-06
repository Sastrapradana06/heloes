import { useState } from "react";

export default function useHandleFile() {
  const [file, setFile] = useState(null);
  const [urlImg, setUrlImg] = useState("");

  const handleFile = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setUrlImg(url);
    }
  };

  const reset = () => {
    setFile(null);
    setUrlImg("");
  };

  return { file, urlImg, handleFile, reset };
}
