import { supabase } from "../supabase";

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

  return { status: true, message: "Success" };
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

export const isAuth = async () => {
  const { data, error } = await supabase.auth.getSession();
  console.log({ data, error });
  if (error) {
    console.log({ error });
    return {
      status: false,
      message: error.message,
    };
  }
  return { status: true, message: "Success" };
};
