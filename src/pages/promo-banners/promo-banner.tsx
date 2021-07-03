import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import appContext from "../../contexts/AppContext";

import SearchBar from "../../components/common/search-bar/search-bar";
import BotigaPageView from "../../components/common/botiga-page-view/botiga-page-view";
import CommunityList from "../../components/promo-bannner-view/community-list/community-list";
import BannersList from "../../components/promo-bannner-view/banners-list/banners-list";

import { ApartmentShort } from "../../types/apartment";

import { SearchApartment } from "../../services/banner-service";

export function PromoBanners(): JSX.Element {
  const {
    apartments,
    setApartments,
    setError,
    showMainViewLoader,
    hideMainViewLoader,
  } = useContext(appContext);
  const screenName: string = "Promo Banners";
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");

  useEffect(() => {
    if (apartments.length === 0) {
      showMainViewLoader();
      SearchApartment()
        .then((res) => {
          const apartments: ApartmentShort[] = res.data;
          setApartments(apartments);
          hideMainViewLoader();
        })
        .catch((err) => {
          hideMainViewLoader();
          setError(true, err);
        });
    }
  }, []);

  function clearSearch(): void {
    setSearchText("");
  }

  function setSearch(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setSearchText(value);
  }

  const filterdPartments: ApartmentShort[] = apartments.filter(
    (_apt: ApartmentShort) =>
      _apt.name.toLocaleLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <React.Fragment>
      <SearchBar
        screenName={screenName}
        reset={clearSearch}
        handleChange={setSearch}
        searchValue={searchText}
        onEnter={undefined}
        placeHolder={"Search apartment..."}
      />
      <BotigaPageView>
        <CommunityList
          apartments={filterdPartments}
          selectedCommunity={selectedCommunity}
          setSelectedCommunity={setSelectedCommunity}
        />
        <BannersList
          setError={setError}
          selectedCommunity={selectedCommunity}
          showMainViewLoader={showMainViewLoader}
          hideMainViewLoader={hideMainViewLoader}
        />
      </BotigaPageView>
    </React.Fragment>
  );
}
