import { supabase, supabaseAdmin } from "../supabase";

export const Login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log({ data, error });

  if (error) {
    console.log({ error });
    return {
      status: false,
      message: error.message,
    };
  }

  return { status: true, message: "Success", session: data.session };
};

export const SignUp = async (userData) => {
  console.log({ userData });
  const { email, password, username, avatar, role } = userData;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username,
        avatar,
        role,
        status: "aktif",
        orders: 0,
      },
    },
  });

  console.log({ data, error });

  if (error) {
    console.log({ error });
    return {
      status: false,
      message:
        error.status == 429
          ? "Batas maksimal request terlampaui"
          : "Terjadi kesalahan",
    };
  }

  return { status: true, message: "Success" };
};

export const User = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const Users = async () => {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();
  console.log({ users, error });

  if (error) {
    throw new Error("Terjadi kesalahan");
  }

  return users;
};
