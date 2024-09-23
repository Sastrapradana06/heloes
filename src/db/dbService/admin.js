import { deleteAllCookies, extractFilePath } from "../../utils";
import { supabase, supabaseAdmin } from "../supabase";
import { deleteFile, uploadFile } from "./file";

export const Login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log({ error });
    return {
      status: false,
      message: "Please check your email and password",
    };
  }

  const { session, user } = data;

  if (user.user_metadata.status !== "aktif") {
    return {
      status: false,
      message: "Your account is frozen, please contact the store admin",
    };
  }

  return { status: true, message: "Success", session: session };
};

export const SignUp = async (userData) => {
  const { email, password, username, avatar, role } = userData;
  const { error } = await supabase.auth.signUp({
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

  if (error) {
    console.log({ error });
    return {
      status: false,
      message:
        error.status == 422
          ? "Email already exist"
          : "Sign up failed, please try again",
    };
  }

  return { status: true, message: "Sign up successful" };
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

  if (error) {
    throw new Error("Terjadi kesalahan");
  }

  const selectCustomers = users.filter(
    (item) => item.user_metadata.role !== "super admin"
  );

  return selectCustomers;
};

export const Signout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("Terjadi kesalahan");
  }

  deleteAllCookies();
};

export const CreateUser = async (data) => {
  if (data.fileImg) {
    const upload = await uploadFile("avatar", data.fileImg);
    if (upload.status) {
      data.avatar = upload.url;
    }
    delete data.fileImg;
  }

  const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      avatar: data.avatar,
      username: data.username,
      email: data.email,
      address: data.address,
      phone: data.phone,
      role: data.role,
      status: "aktif",
      ...(data.role == "customer" && { orders: 0 }),
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    status: true,
    message: "Success",
    user,
  };
};

export const DeleteUser = async (id) => {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);

  if (error) {
    throw new Error("Terjadi kesalahan saat mengambil data user");
  }

  const avatar = data.user.user_metadata.avatar;

  if (avatar && avatar !== "profile.jpeg") {
    const urlAvatar = extractFilePath("avatar", avatar);
    const deleteAvatar = await deleteFile("avatar", urlAvatar);

    if (!deleteAvatar) {
      throw new Error("Terjadi kesalahan saat menghapus avatar");
    }
  }

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(id);

  if (deleteError) {
    throw new Error(
      `Terjadi kesalahan saat menghapus user: ${deleteError.message}`
    );
  }

  return {
    status: true,
    message: "Pengguna berhasil dihapus",
    user: data,
  };
};

export const UpdateStatusUser = async (id, userStatus) => {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
    user_metadata: { status: userStatus == "aktif" ? "inactive" : "aktif" },
  });

  if (error) {
    throw new Error(error.message);
  }
  return {
    status: true,
    message: "Success",
  };
};
