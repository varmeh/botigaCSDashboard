import axios, { AxiosInstance } from "axios";
import { Token } from "./token";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const token: Token = new Token();
token.initAuthenticationToken();

export default function axiosConfig(): AxiosInstance {
  instance.defaults.headers.common["Authorization"] =
    token.getAuthenticationToken();
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.post["Accept"] = "application/json";
  return instance;
}
