import { useState } from "react";
import { Formik } from "formik";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

import BotigaAutoComplete from "../../common/autocomplete/autocomplete";
import BotigaTextField from "../../common/botiga-text-field/botiga-text-filed";
import { NotificationImageUpload } from "../../common/notification-image-upload/notification-image-upload";
import { marketingSellers, marketingBanners } from "../../../types/apartment";
import { errorType } from "../../../types/error";
import { APIResponse } from "../../../types/api-response";
import Image from "../../common/image/image";
import { addBannerValidator } from "../../../helpers/validators";

import { deleteImage } from "../../../services/image-service";
import { addApartmentBanner } from "../../../services/banner-service";
import "./banner-detail.scss";

function Header(): JSX.Element {
  return (
    <div className="banner-header-item">
      <div className="banner-header-name">Add banner</div>
    </div>
  );
}

type bannerFormProps = {
  setShowAddForm: (value: boolean) => void;
  sellers: marketingSellers[];
  setError: (value: boolean, err?: errorType) => void;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  selectedCommunity: string;
  updateMarketingBanner: (banners: marketingBanners[]) => void;
};
function BannerForm({
  setShowAddForm,
  sellers,
  setError,
  showMainViewLoader,
  hideMainViewLoader,
  selectedCommunity,
  updateMarketingBanner,
}: bannerFormProps): JSX.Element {
  const [bannerImage, setBannerImage] = useState<string>("");

  function hideAddNewBanner(): void {
    setShowAddForm(false);
  }

  const sellerList = sellers.map((seller) => ({
    key: seller.brandName,
    value: seller._id,
  }));

  const initialValue = {
    sellerId: "",
    position: "",
  };

  async function deleteNotificationImage(): Promise<void> {
    try {
      showMainViewLoader();
      await deleteImage(bannerImage);
      setBannerImage("");
    } catch (err) {
      setError(true, err);
    } finally {
      hideMainViewLoader();
    }
  }

  function onError(): void {
    setBannerImage("");
  }

  return (
    <Formik
      enableReinitialize
      validationSchema={addBannerValidator}
      initialValues={initialValue}
      onSubmit={async (values) => {
        try {
          const { sellerId, position } = values;
          showMainViewLoader();
          const response: APIResponse<marketingBanners[]> =
            await addApartmentBanner(
              selectedCommunity,
              bannerImage,
              sellerId,
              position
            );
          const markettingBannersData: marketingBanners[] = response.data;
          updateMarketingBanner(markettingBannersData);
          hideAddNewBanner();
        } catch (err) {
          setError(true, err);
        } finally {
          hideMainViewLoader();
        }
      }}
    >
      {({ handleSubmit, getFieldProps, setFieldValue, touched, errors }) => (
        <form onSubmit={handleSubmit}>
          <div className="banner-details-body">
            <div className="banner-form">
              <div className="banner-details-row">
                <BotigaAutoComplete
                  id="sellerId"
                  optionsList={sellerList}
                  {...getFieldProps("sellerId")}
                  onChange={(_, v) => setFieldValue("sellerId", v.value)}
                  label="Seller Name"
                  variant="outlined"
                  error={touched.sellerId && errors.sellerId}
                  helperText={errors.sellerId}
                />
              </div>
              <div className="banner-details-row">
                <BotigaTextField
                  id="position"
                  label="Banner Position"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("position")}
                  error={touched.position && errors.position}
                  helperText={errors.position}
                />
              </div>
              <div className="banner-details-row">
                {bannerImage ? (
                  <div className="banner-image-preview-container">
                    <Image
                      src={bannerImage}
                      alt={`banner`}
                      className="banner-image-preview-img"
                      onError={onError}
                    />
                    <CloseIcon
                      className="banner-image-preview-close"
                      onClick={deleteNotificationImage}
                    />
                  </div>
                ) : (
                  <NotificationImageUpload
                    setError={setError}
                    showMainViewLoader={showMainViewLoader}
                    hideMainViewLoader={hideMainViewLoader}
                    onUploadSuccess={setBannerImage}
                  />
                )}
              </div>
            </div>
            <div className="banner-detail-form-row-action">
              <Button disableElevation onClick={hideAddNewBanner}>
                cancel
              </Button>
              <div className="spacer" />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                Add Banner
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

type bannerDetailsProps = {
  setShowAddForm: (value: boolean) => void;
  showAddForm: boolean;
  sellers: marketingSellers[];
  setError: (value: boolean, err?: errorType) => void;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  selectedCommunity: string;
  updateMarketingBanner: (banners: marketingBanners[]) => void;
};

export default function BannerDetails({
  setShowAddForm,
  showAddForm,
  sellers,
  setError,
  showMainViewLoader,
  hideMainViewLoader,
  selectedCommunity,
  updateMarketingBanner,
}: bannerDetailsProps): JSX.Element {
  return (
    <div className="banner-details-style">
      <Header />
      {showAddForm ? (
        <BannerForm
          setError={setError}
          sellers={sellers}
          setShowAddForm={setShowAddForm}
          showMainViewLoader={showMainViewLoader}
          hideMainViewLoader={hideMainViewLoader}
          selectedCommunity={selectedCommunity}
          updateMarketingBanner={updateMarketingBanner}
        />
      ) : null}
    </div>
  );
}
