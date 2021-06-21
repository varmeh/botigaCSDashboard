import { useState, useEffect } from "react";
import { Formik } from "formik";

import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

import Image from "../../common/image/image";
import TextField from "../../common/botiga-text-field/botiga-text-filed";
import { notificationFormValidator } from "../../../helpers/validators";
import Notification from "../../../types/notification";

import {
  sendNotification,
  saveNotification,
} from "../../../services/notification-service";

import "./notification-form.scss";

type notificationFormProps = {
  notification: Notification;
  selectedApartements: string[];
  selectedSeller: string;
  phoneNumber: string;
};

export default function NotificationForm({
  notification,
  selectedApartements,
  selectedSeller,
  phoneNumber,
}: notificationFormProps): JSX.Element {
  const [notificationImage, setNotificationImage] = useState<string>("");
  const { title, content, imageUrl } = notification;

  useEffect(() => {
    setNotificationImage(imageUrl);
  }, [imageUrl]);

  const initialValue = {
    title,
    content,
  };

  async function deleteNotificationImage(): Promise<void> {}

  function onError(): void {
    setNotificationImage("");
  }

  const isApartmentSelectionEmpty: boolean = selectedApartements.length === 0;

  return (
    <Formik
      enableReinitialize
      validationSchema={notificationFormValidator}
      initialValues={initialValue}
      onSubmit={async (values) => {
        const { title, content } = values;
        let notificationsToBeSend: any[] = [];
        selectedApartements.forEach((apartmentId) => {
          notificationsToBeSend.push(
            sendNotification(
              apartmentId,
              title,
              content,
              notificationImage,
              selectedSeller
            )
          );
        });
        try {
          const sendNotifactionResponse = await Promise.all(
            notificationsToBeSend
          );
          const saveNotificationResponse = await saveNotification(
            phoneNumber,
            title,
            content,
            notificationImage
          );
        } catch (err) {}
      }}
    >
      {({ handleSubmit, getFieldProps, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="notification-detail-form">
            <div className="notification-form">
              <div className="notification-detail-form-row">
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("title")}
                  error={touched.title && errors.title}
                  helperText={errors.title}
                />
              </div>
              <div className="notification-detail-form-row">
                <TextField
                  {...getFieldProps("content")}
                  id="content"
                  label="Content"
                  multiline
                  fullWidth
                  rows={3}
                  variant="outlined"
                  error={touched.content && errors.content}
                  helperText={errors.content}
                />
              </div>
              <div className="notification-detail-form-row">
                {notificationImage ? (
                  <div className="notification-image-preview-container">
                    <Image
                      src={notificationImage}
                      alt={`NotificationImage ${title}`}
                      className="notification-image-preview-img"
                      onError={onError}
                    />
                    <CloseIcon
                      className="notification-image-preview-close"
                      onClick={deleteNotificationImage}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            {!isApartmentSelectionEmpty ? (
              <div className="notification-detail-form-row-action">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<SendIcon />}
                >
                  Send Notification
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      )}
    </Formik>
  );
}
