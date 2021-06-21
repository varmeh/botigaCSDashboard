import axios from "../helpers/axios";
import { APIResponse } from "../types/api-response";

async function getOrdersByOrderNumber(
  orderNumber: string
): Promise<APIResponse> {
  return axios().get(`api/admin/orders/order/${orderNumber}`);
}

async function getOrdersByPhoneNumber(
  phoneNumber: string
): Promise<APIResponse> {
  return axios().get(`/api/admin/orders/phone/${phoneNumber}`);
}

export { getOrdersByOrderNumber, getOrdersByPhoneNumber };
