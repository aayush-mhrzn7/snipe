import { LoginFormData, OTPFormData } from "@/utils/schema/user.schema";
import { axiosInstance, getBody } from "./api.service";
import { readCookies } from "@/utils/cookies.utils";

const userLogin = async (
  data: LoginFormData
): Promise<APIResults<Response>> => {
  return await axiosInstance.post("/login", getBody(data));
};
const userRegister = async (
  data: LoginFormData
): Promise<APIResults<Response>> => {
  return await axiosInstance.post("/signup", getBody(data));
};
const generateOTP = async (
  data: LoginFormData
): Promise<APIResults<Response>> => {
  return await axiosInstance.post("/generate-otp", getBody(data));
};
const verifyOTP = async (data: OTPFormData): Promise<APIResults<Response>> => {
  return await axiosInstance.post("/verify-otp", getBody(data));
};
const regenrateOTP = async (
  data: Pick<OTPFormData, "email">
): Promise<APIResults<Response>> => {
  return await axiosInstance.post("/regenerate-otp", getBody(data));
};
const getUserData = async () => {
  const data = await readCookies("token");
  return data?.value;
};
export {
  userLogin,
  userRegister,
  getUserData,
  generateOTP,
  verifyOTP,
  regenrateOTP,
};
type Response = {
  message: string;
  result: {
    id: string;
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
};
