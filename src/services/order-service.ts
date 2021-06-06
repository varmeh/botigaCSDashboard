import axios, { APIResponse } from "../helpers/axios";
import { AxiosResponse } from "axios";

async function getOrdersByOrderNumber(
  orderNumber: string
): Promise<AxiosResponse<APIResponse>> {
  return axios().get(`api/admin/orders/order/${orderNumber}`);
}

async function getOrdersByPhoneNumber(
  phoneNumber: string
): Promise<AxiosResponse<APIResponse>> {
  return axios().get(`/api/admin/orders/phone/${phoneNumber}`);
}

export { getOrdersByOrderNumber, getOrdersByPhoneNumber };
