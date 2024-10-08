import { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import NotificationForm from "../notification-form/notification-form";
import ApartmentList from "../apartment-list/apartment-list";
import { APIResponse } from "../../../types/api-response";
import Notification from "../../../types/notification";
import Apartment from "../../../types/apartment";
import { errorType } from "../../../types/error";

import { getNotificationDeatilForSeller } from "../../../services/notification-service";

import "./notification-detail.scss";

type notificationType = {
  notification: Notification;
  apartments: Apartment[];
} | null;

type notificationDeatislProps = {
  phoneNumber: string;
  setError: (value: boolean, err?: errorType) => void;
  selectedSeller: string;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
};

function NotificationDetailHeader(): JSX.Element {
  return (
    <div className="notification-header-item">
      <div className="notification-header-name">Notification Details</div>
    </div>
  );
}

export default function NotificationDetail({
  phoneNumber,
  setError,
  selectedSeller,
  showMainViewLoader,
  hideMainViewLoader,
}: notificationDeatislProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationDetails, setNotificationDetails] =
    useState<notificationType>(null);
  const [selectedApartements, setSelectedApartments] = useState<string[]>([]);

  async function fetchNotificationDetails(phone: string): Promise<void> {
    try {
      if (phone !== "") {
        setIsLoading(true);
        const response: APIResponse<notificationType> =
          await getNotificationDeatilForSeller(phone);
        const data: notificationType = response.data;
        if (data) {
          const apartments: Apartment[] = data.apartments;
          if (apartments.length > 0) {
            const allApartments: string[] = apartments.map(
              (apartment: Apartment) => apartment._id
            );
            setSelectedApartments(allApartments);
          }
          setNotificationDetails(data);
        }
      }
    } catch (err) {
      setError(true, err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotificationDetails(phoneNumber);
  }, [phoneNumber]);

  function toggleSelectedApartment(id: string): void {
    let apartments: string[] = [];
    if (selectedApartements.includes(id)) {
      apartments = selectedApartements.filter((_id) => _id !== id);
    } else {
      apartments = [...selectedApartements, id];
    }
    setSelectedApartments(apartments);
  }

  if (isLoading) {
    return (
      <div className="disable-container">
        <div className="notification-detail-style">
          <NotificationDetailHeader />
          <div className="notification-detail-body">
            <div className="view-loader">
              <CircularProgress />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!isLoading && notificationDetails) {
    return (
      <div className="notification-detail-style">
        <NotificationDetailHeader />
        <div className="notification-detail-body">
          <NotificationForm
            selectedApartements={selectedApartements}
            notification={notificationDetails.notification}
            selectedSeller={selectedSeller}
            phoneNumber={phoneNumber}
            showMainViewLoader={showMainViewLoader}
            hideMainViewLoader={hideMainViewLoader}
            setError={setError}
          />
          <ApartmentList
            selectedApartements={selectedApartements}
            toggleSelectedApartment={toggleSelectedApartment}
            apartments={notificationDetails.apartments}
          />
        </div>
      </div>
    );
  }
  if (!selectedSeller) {
    return (
      <div className="notification-detail-style">
        <NotificationDetailHeader />
        <div className="notification-detail-body">
          <div className="no-slection">No Seller selected</div>
        </div>
      </div>
    );
  }
  return (
    <div className="notification-detail-style">
      <NotificationDetailHeader />
      <div className="notification-detail-body" />
    </div>
  );
}
