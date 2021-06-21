import React, { useState, useContext, ChangeEvent, useEffect } from "react";
import appContext from "../../contexts/AppContext";

import SearchBar from "../../components/common/search-bar/search-bar";
import BotigaPageView from "../../components/common/botiga-page-view/botiga-page-view";
import SellerList from "../../components/notification/seller-list/seller-list";
import NotificationDetail from "../../components/notification/notification-detail/notification-detail";

import { APIResponse } from "../../types/api-response";
import Seller from "../../types/seller";

import { getAppprovedSellers } from "../../services/notification-service";

export function NotificationScreen(): JSX.Element {
  const screenName: string = "Notifications";

  const {
    setError,
    approvedSellers,
    setApprovedSeller,
    showMainViewLoader,
    hideMainViewLoader,
  } = useContext(appContext);

  const [searchText, setSearchText] = useState<string>("");
  const [selectedSeller, setSelectedSeller] = useState<string>("");

  async function fetchApprovedSeller(): Promise<void> {
    try {
      showMainViewLoader();
      const response: APIResponse<Seller[]> = await getAppprovedSellers();
      const data: Seller[] = response.data;
      if (data && data.length > 0) {
        setApprovedSeller(data);
      }
    } catch (err) {
      setError(true, err);
    } finally {
      hideMainViewLoader();
    }
  }

  function clearSearch(): void {
    setSearchText("");
  }

  function setSearch(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setSearchText(value);
  }

  function getSelectedSelerPhoneNumber(): string {
    if (selectedSeller && approvedSellers.length > 0) {
      const seller: Seller | undefined = approvedSellers.find(
        (_seller) => _seller.id === selectedSeller
      );
      if (seller) {
        return seller.phone;
      }
      return "";
    }
    return "";
  }

  function getFilteredApprovedSellers(): Seller[] {
    if (searchText.trim() === "") {
      return approvedSellers;
    }
    return approvedSellers.filter((_seller) =>
      _seller.brand.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  useEffect(() => {
    if (approvedSellers.length === 0) {
      fetchApprovedSeller();
    }
  }, []);

  return (
    <React.Fragment>
      <SearchBar
        screenName={screenName}
        reset={clearSearch}
        handleChange={setSearch}
        searchValue={searchText}
        onEnter={undefined}
        placeHolder={"Enter Brand"}
      />
      <BotigaPageView>
        <SellerList
          selectedSeller={selectedSeller}
          setSelectedSeller={setSelectedSeller}
          approvedSellers={getFilteredApprovedSellers()}
        />
        <NotificationDetail
          setError={setError}
          phoneNumber={getSelectedSelerPhoneNumber()}
          selectedSeller={selectedSeller}
        />
      </BotigaPageView>
    </React.Fragment>
  );
}
