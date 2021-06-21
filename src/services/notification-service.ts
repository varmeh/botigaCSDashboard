import axios from "../helpers/axios";
import Seller from "../types/seller";

import { APIResponse } from "../types/api-response";
import Notification from "../types/notification";
import Apartment from "../types/apartment";

type notificationDetail = {
  notification: Notification;
  apartments: Apartment[];
};

async function getAppprovedSellers(): Promise<APIResponse<Seller[]>> {
  return axios().get(`api/admin/seller/approved`);
}

async function getNotificationDeatilForSeller(
  phoneNumber: string
): Promise<APIResponse<notificationDetail>> {
  return axios().get(`api/admin/seller/notification/${phoneNumber}`);
}

async function sendNotification(
  topic: string,
  title: string,
  content: string,
  imageUrl: string,
  sellerId: string
): Promise<APIResponse> {
  return axios().post("/api/admin/notification/topic", {
    topic: `${topic}_users`,
    title,
    content,
    imageUrl,
    sellerId,
  });
}

async function saveNotification(
  phone: string,
  title: string,
  content: string,
  imageUrl: string
): Promise<APIResponse> {
  return axios().patch("api/admin/seller/notification", {
    phone,
    title,
    content,
    imageUrl,
  });
}

export {
  getAppprovedSellers,
  getNotificationDeatilForSeller,
  sendNotification,
  saveNotification,
};
