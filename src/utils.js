import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
export function formatDate(dateString) {
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const date = new Date(dateString);
  const hari = date.getDate();
  const bulanNama = bulan[date.getMonth()]; // Ambil nama bulan yang disingkat
  const tahun = date.getFullYear();

  return `${hari} ${bulanNama} ${tahun}`;
}

// Fungsi untuk melakukan hashing password
export const hashPassword = async (password) => {
  try {
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Hashing failed");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw new Error("Comparison failed");
  }
};

export const generateToken = (length = 20) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};

export const setCookies = (name, data) => {
  let now = new Date();
  now.setTime(now.getTime() + 2 * 60 * 60 * 1000);

  Cookies.set(name, data, { expires: now });
};

export const deleteCookies = () => {
  Cookies.remove("token");
  Cookies.remove("idUser");
};

export const getCookies = (name) => {
  const cookies = Cookies.get(name);
  return cookies;
};

export const saveTokensToCookies = (accessToken, expiresAt) => {
  const expirationDays =
    (expiresAt - Math.floor(Date.now() / 1000)) / (60 * 60 * 24);
  Cookies.set("access_token", accessToken, { expires: expirationDays });
};
