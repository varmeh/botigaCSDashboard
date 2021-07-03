import React, { useState, useEffect } from "react";
import { Formik } from "formik";

import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Image from "../../common/image/image";
import { NotificationImageUpload } from "../../common/notification-image-upload/notification-image-upload";
import TextField from "../../common/botiga-text-field/botiga-text-filed";
import { notificationFormValidator } from "../../../helpers/validators";
import Notification from "../../../types/notification";
import { errorType } from "../../../types/error";

import {
  sendNotification,
  saveNotification,
} from "../../../services/notification-service";

import { deleteImage } from "../../../services/image-service";

import "./notification-form.scss";

type notificationFormProps = {
  notification: Notification;
  selectedApartements: string[];
  selectedSeller: string;
  phoneNumber: string;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  setError: (value: boolean, err?: errorType) => void;
};

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function NotificationForm({
  notification,
  selectedApartements,
  selectedSeller,
  phoneNumber,
  showMainViewLoader,
  hideMainViewLoader,
  setError,
}: notificationFormProps): JSX.Element {
  const [notificationImage, setNotificationImage] = useState<string>("");
  const [isNotificationAlertOpen, setNotificationAlertOpen] =
    useState<boolean>(false);
  const { title, content, imageUrl } = notification;

  useEffect(() => {
    setNotificationImage(imageUrl);
  }, [imageUrl]);

  const initialValue = {
    title,
    content,
  };

  async function deleteNotificationImage(): Promise<void> {
    try {
      showMainViewLoader();
      await deleteImage(notificationImage);
      setNotificationImage("");
    } catch (err) {
      setError(true, err);
    } finally {
      hideMainViewLoader();
    }
  }

  function onError(): void {
    setNotificationImage("");
  }

  const handleAlertClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationAlertOpen(false);
  };

  const isApartmentSelectionEmpty: boolean = selectedApartements.length === 0;

  return (
    <React.Fragment>
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
            showMainViewLoader();
            await Promise.all(notificationsToBeSend);
            await saveNotification(
              phoneNumber,
              title,
              content,
              notificationImage
            );
            setNotificationAlertOpen(true);
          } catch (err) {
            setError(true, err);
          } finally {
            hideMainViewLoader();
          }
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
                  ) : (
                    <NotificationImageUpload
                      setError={setError}
                      showMainViewLoader={showMainViewLoader}
                      hideMainViewLoader={hideMainViewLoader}
                      onUploadSuccess={setNotificationImage}
                    />
                  )}
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
      <div className="notification-success">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          key={"bottom right"}
          open={isNotificationAlertOpen}
          autoHideDuration={4000}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity={"success"}>
            <React.Fragment>
              <div className="success-heading">SUCCESS!</div>
              <div className="success-secondary">
                Notification successfully sent to topics.
              </div>
            </React.Fragment>
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
}
