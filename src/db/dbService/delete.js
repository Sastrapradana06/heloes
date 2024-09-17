import { supabase } from "../supabase";

export const deleteDataDb = async (db, key, value) => {
  const { error } = await supabase.from(db).delete().eq(key, value);
  console.log({ error });

  if (error) {
    throw new Error("Terjadi kesalahan");
  }
  return { status: true, message: "Success" };
};
