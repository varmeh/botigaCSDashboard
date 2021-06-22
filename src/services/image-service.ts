import axios from "../helpers/axios";
import { APIResponse } from "../types/api-response";

type uploadBannerImageResponse = {
  imageUrl: string;
};
async function uploadBannerImage(
  image: File
): Promise<APIResponse<uploadBannerImageResponse>> {
  var bodyFormData = new FormData();
  bodyFormData.append("image", image);
  return axios().post("/api/admin/banners/image", bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function deleteImage(imageUrl: string): Promise<APIResponse> {
  return axios().post("/api/admin/image/delete", { imageUrl });
}

export { uploadBannerImage, deleteImage };
