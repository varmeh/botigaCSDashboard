import React from "react";
import Seller from "../../../types/seller";

import "./seller-list.scss";

type sellerListProps = {
  approvedSellers: Seller[];
  selectedSeller: string;
  setSelectedSeller: (id: string) => void;
};
type sellerProps = {
  seller: Seller;
  selectedSeller: string;
  setSelectedSeller: (id: string) => void;
};

function SellerListHeader(): JSX.Element {
  return (
    <div className="seller-header-item">
      <div className="seller-header-name">Sellers</div>
    </div>
  );
}

function SellerItem({
  seller,
  selectedSeller,
  setSelectedSeller,
}: sellerProps): JSX.Element {
  let sellerItemClass = "seller-item";
  const { brand, id } = seller;

  function selectSeller() {
    setSelectedSeller(id);
  }

  if (id === selectedSeller) {
    sellerItemClass = `${sellerItemClass} item_selected`;
  }

  return (
    <div className={sellerItemClass} onClick={selectSeller}>
      <div className="seller-name">{brand}</div>
    </div>
  );
}

export default function SellerList({
  approvedSellers,
  selectedSeller,
  setSelectedSeller,
}: sellerListProps): JSX.Element {
  return (
    <div className="seller-list-style">
      <SellerListHeader />
      <div className="seller-list-body">
        {approvedSellers.map((seller: Seller) => (
          <SellerItem
            selectedSeller={selectedSeller}
            setSelectedSeller={setSelectedSeller}
            seller={seller}
          />
        ))}
      </div>
    </div>
  );
}
