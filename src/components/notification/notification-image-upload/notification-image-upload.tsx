import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { errorType } from "../../../types/error";
import { uploadBannerImage } from "../../../services/image-service";

import "./notification-image-upload.scss";

type notificationImageUploadProps = {
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  setError: (value: boolean, err?: errorType) => void;
  onUploadSuccess: (imageUrl: string) => void;
};

export function NotificationImageUpload({
  setError,
  showMainViewLoader,
  hideMainViewLoader,
  onUploadSuccess,
}: notificationImageUploadProps): JSX.Element {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file: File) => {
      try {
        showMainViewLoader();
        const {
          data: { imageUrl },
        } = await uploadBannerImage(file);
        onUploadSuccess(imageUrl);
      } catch (err) {
        setError(true, err);
      } finally {
        hideMainViewLoader();
      }
    });
  }, []);

  const dropzoneConfig = {
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
    multiple: true,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneConfig);

  return (
    <div className="notification-upload-image" {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="add-image-btn">Upload Banner</div>
      <div className="description">or drag and drop files</div>
    </div>
  );
}
