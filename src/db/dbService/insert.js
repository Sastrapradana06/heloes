import { supabase } from "../supabase";
import { uploadFile } from "./file";

export const insertUserDB = async (data) => {
  const { error } = await supabase.from("user").insert(data);
  console.log({ error });

  if (error) {
    return {
      status: false,
      message: error.code == "23505" ? "Email sudah terdaftar" : error.message,
    };
  }
  return { status: true, message: "Success" };
};

export const insertDataDB = async (db, data) => {
  const { error } = await supabase.from(db).insert(data);

  if (error) {
    throw new Error("Terjadi kesalahan");
  }

  return { status: true, message: "Success" };
};

export const insertProductDB = async (data) => {
  if (data.fileImg) {
    const uploadImg = await uploadFile("products", data.fileImg);
    if (uploadImg.status) {
      data.image = uploadImg.url;
    }
  }

  const dataInsert = {
    image: data.image,
    name: data.name,
    category: data.category,
    description: data.description,
    price: data.price,
    stock: data.stock,
    brand: data.brand,
    tags: data.tags,
    color: data.color,
    size: data.size,
    sales: data.sales,
  };

  const { error } = await supabase.from("products").insert(dataInsert);

  if (error) {
    throw new Error("Terjadi kesalahan");
  }

  return { status: true, message: "Success" };
};
