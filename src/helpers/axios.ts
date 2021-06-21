import axios, { AxiosInstance } from "axios";
import { Token } from "./token";

const instance: AxiosInstance = axios.create({
  //baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://dev.botiga.app",
});
const token: Token = new Token();
token.initAuthenticationToken();

export default function axiosConfig(): AxiosInstance {
  // instance.defaults.headers.common["Authorization"] =
  //   token.getAuthenticationToken();
  instance.defaults.headers.common["Authorization"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmExOGQ4MDAyMjgxNjQzODAyZTFlOCIsImlhdCI6MTYyNDE3Mjk5NSwiZXhwIjoxNjI0NjA0OTk1fQ.ufpXwNXZPPm8Pw1s2plDHuOl-I0jCB_q4P9W912DJ-I";
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.post["Accept"] = "application/json";
  return instance;
}
