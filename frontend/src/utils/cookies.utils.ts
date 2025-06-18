"use server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const createCookies = async (
  name: string,
  value: string,
  options?: any
) => {
  const cookie = await cookies();
  cookie.set(name, value, {
    secure: false,
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 180,
    ...options,
  });
  return true;
};

export const readCookies = async (name: string) => {
  const cookie = await cookies();
  return await cookie.get(name);
};

export const deleteCookies = async (name: string) => {
  const cookie = await cookies();
  cookie.delete(name);
  return true;
};

export const deleteAllCookies = async () => {
  const cookie = await cookies();
  const allCookies = cookie.getAll();
  allCookies.forEach((c) => {
    cookie.delete(c.name);
  });
  return true;
};

export const decodeToken = async (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};
