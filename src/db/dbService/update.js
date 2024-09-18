import { supabase } from "../supabase";

export const updateDataDB = async (db, data, id) => {
  const { error } = await supabase.from(db).update(data).eq("id", id);
  if (error) {
    console.log({ error });
    throw new Error("Terjadi kesalahan");
  }
  return { status: true, message: "Success" };
};
