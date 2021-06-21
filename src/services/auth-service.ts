import axios from "../helpers/axios";
import { APIResponse } from "../types/api-response";

async function fetchProfile(): Promise<APIResponse> {
  return axios().get("/api/admin/auth/profile");
}

async function getOTP(phone: string): Promise<APIResponse> {
  return axios().get(`/api/admin/auth/otp/${phone}`);
}

async function signWithOtp(
  phone: string,
  sessionId: string,
  otpVal: string
): Promise<APIResponse> {
  return axios().post(`/api/admin/auth/otp/verify`, {
    phone,
    sessionId,
    otpVal,
  });
}

async function Logout(): Promise<APIResponse> {
  return axios().post(`/api/admin/auth/signout`, {});
}

export { fetchProfile, getOTP, signWithOtp, Logout };
