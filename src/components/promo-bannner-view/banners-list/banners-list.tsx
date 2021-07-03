import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

import Image from "../../common/image/image";
import BannerDetails from "../banner-detail/banner-detail";

import {
  getApartmentDetails,
  deleteApartmentBanner,
} from "../../../services/banner-service";
import { deleteImage } from "../../../services/image-service";

import {
  ApartmentWithBannerDetails,
  marketingBanners,
  marketingSellers,
} from "../../../types/apartment";

import { errorType } from "../../../types/error";

import "./banners-list.scss";

type bannerHeaderProps = {
  setShowAddForm: (value: boolean) => void;
  sellers: marketingSellers[];
};
function BannerHeader({
  setShowAddForm,
  sellers,
}: bannerHeaderProps): JSX.Element {
  function addNewBanner(): void {
    setShowAddForm(true);
  }

  return (
    <div className="banner-header-item">
      <div className="banner-header-name">Banner</div>
      {sellers.length > 0 ? (
        <Button className="banner-header-btn" onClick={addNewBanner}>
          + NEW
        </Button>
      ) : null}
    </div>
  );
}

type bannerItemProps = {
  banner: marketingBanners;
  position: number;
  sellerBrandName: string;
  deleteBanner: (bannerId: string, imageUrl: string) => Promise<void>;
};

function BannerItem({
  banner,
  position,
  sellerBrandName,
  deleteBanner,
}: bannerItemProps): JSX.Element {
  const { url, id } = banner;

  function removeBanner(): void {
    deleteBanner(id, url);
  }

  return (
    <div className="banner-item">
      <div className="banner-image-header">
        <div>{sellerBrandName}</div>
        <div>{position}</div>
      </div>
      <div className="banner-image-preview-container">
        <Image
          src={url}
          alt={`BannerImage ${id}`}
          className="banner-image-preview-img"
        />
        <CloseIcon
          className="banner-image-preview-close"
          onClick={removeBanner}
        />
      </div>
    </div>
  );
}

type BannerListProps = {
  selectedCommunity: string;
  setError: (value: boolean, err?: errorType) => void;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
};
export default function BannersList({
  selectedCommunity,
  setError,
  showMainViewLoader,
  hideMainViewLoader,
}: BannerListProps): JSX.Element {
  const [apartmentDetails, setApartmentDetails] =
    useState<ApartmentWithBannerDetails | null>(null);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedCommunity) {
      setIsLoading(true);
      getApartmentDetails(selectedCommunity)
        .then((res) => {
          const apartmentDetailsData: ApartmentWithBannerDetails = res.data;
          setApartmentDetails(apartmentDetailsData);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(true, err);
          setIsLoading(false);
        });
    }
  }, [selectedCommunity]);

  useEffect(() => {
    if (selectedCommunity) {
      setShowAddForm(false);
      setApartmentDetails(null);
    }
  }, [selectedCommunity]);

  function getSellerbrandNameFromId(sellerId: string): string {
    if (apartmentDetails) {
      const seller: marketingSellers | undefined =
        apartmentDetails.sellers.find(
          (seller: marketingSellers) => seller._id === sellerId
        );

      if (seller) {
        return seller.brandName;
      }
      return "";
    }
    return "";
  }

  async function deleteBanner(
    bannerId: string,
    imageUrl: string
  ): Promise<void> {
    try {
      setIsLoading(true);
      await deleteApartmentBanner(selectedCommunity, bannerId);
      await deleteImage(imageUrl);
      if (apartmentDetails) {
        const tempApartmentDetails: ApartmentWithBannerDetails = {
          ...apartmentDetails,
          marketingBanners: apartmentDetails.marketingBanners.filter(
            (banner) => banner.id !== bannerId
          ),
        };
        setApartmentDetails(tempApartmentDetails);
      }
    } catch (err) {
      setError(true, err);
    } finally {
      setIsLoading(false);
    }
  }

  function updateMarketingBanner(banners: marketingBanners[]): void {
    if (apartmentDetails) {
      const tempApartmentDetails = {
        ...apartmentDetails,
        marketingBanners: banners,
      };
      setApartmentDetails(tempApartmentDetails);
    }
  }

  return (
    <div
      className={
        isLoading
          ? "disable-container banner-list-container"
          : "banner-list-container"
      }
    >
      {isLoading ? (
        <div className="view-loader">
          <CircularProgress />
        </div>
      ) : null}
      <div className="banner-list-style">
        <BannerHeader
          sellers={apartmentDetails ? apartmentDetails.sellers : []}
          setShowAddForm={setShowAddForm}
        />
        <div className="banner-list-body">
          {apartmentDetails
            ? apartmentDetails.marketingBanners.map((banner, index) => (
                <BannerItem
                  key={banner.id}
                  banner={banner}
                  position={index}
                  sellerBrandName={getSellerbrandNameFromId(banner.sellerId)}
                  deleteBanner={deleteBanner}
                />
              ))
            : null}
        </div>
      </div>
      <BannerDetails
        setError={setError}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        sellers={apartmentDetails ? apartmentDetails.sellers : []}
        showMainViewLoader={showMainViewLoader}
        hideMainViewLoader={hideMainViewLoader}
        selectedCommunity={selectedCommunity}
        updateMarketingBanner={updateMarketingBanner}
      />
    </div>
  );
}
