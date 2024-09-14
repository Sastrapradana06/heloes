import { supabase } from "../supabase";

export const inserDataDb = async (db, data) => {
  const { error } = await supabase.from(db).insert(data);

  if (error) {
    throw new Error(
      error.code === "23505" ? "Email sudah terdaftar" : error.message
    );
  }

  return { status: true, message: "Success" };
};
