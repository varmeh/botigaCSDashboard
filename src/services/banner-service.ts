import axios from "../helpers/axios";
import { APIResponse } from "../types/api-response";
import {
  ApartmentShort,
  ApartmentWithBannerDetails,
  marketingBanners,
} from "../types/apartment";

async function SearchApartment(): Promise<APIResponse<ApartmentShort[]>> {
  return axios().get("api/services/apartments/search?text=");
}

async function getApartmentDetails(
  apartmentId: string
): Promise<APIResponse<ApartmentWithBannerDetails>> {
  return axios().get(`api/admin/apartments/${apartmentId}`);
}

async function deleteApartmentBanner(
  apartmentId: string,
  bannerId: string
): Promise<APIResponse<ApartmentWithBannerDetails>> {
  return axios().delete(
    `api/admin/apartments/${apartmentId}/banners/${bannerId}`
  );
}

async function addApartmentBanner(
  apartmentId: string,
  bannerUrl: string,
  sellerId: string,
  position: string
): Promise<APIResponse<marketingBanners[]>> {
  return axios().post(`api/admin/apartments/banners`, {
    apartmentId,
    bannerUrl,
    sellerId,
    position: typeof position === "string" ? parseInt(position) : 0,
  });
}

export {
  SearchApartment,
  getApartmentDetails,
  deleteApartmentBanner,
  addApartmentBanner,
};
