import { supabase } from "../supabase";

export async function uploadFile(folder, file) {
  const { error } = await supabase.storage
    .from("heloess")
    .upload(`${folder}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error.message);
    return {
      status: false,
      message: error.message,
    };
  }

  const { data } = supabase.storage
    .from("heloess")
    .getPublicUrl(`${folder}/${file.name}`);

  return {
    status: true,
    message: "Success",
    url: data.publicUrl,
  };
}

export const deleteFile = async (folder, url) => {
  const { error } = await supabase.storage
    .from("heloess")
    .remove([`${folder}/${url}`]);

  if (error) {
    console.log(error);
    return false;
  }
  return true;
};
