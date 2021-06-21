import React, { useState, ChangeEvent } from "react";
// import appContext from "../../contexts/AppContext";
import SearchBar from "../../components/common/search-bar/search-bar";
import BotigaPageView from "../../components/common/botiga-page-view/botiga-page-view";
import OrderList from "../../components/order-view/order-list/order-list";

// import {
//   getOrdersByOrderNumber,
//   getOrdersByPhoneNumber,
// } from "../../services/order-service";

import boxOpen from "../../assets/images/box-open.svg";

import "./search-order.scss";

export function SearchOrder(): JSX.Element {
  const screenName: string = "Search Orders";
  const [searchText, setSearchText] = useState<string>("");
  const orderList = [];

  function clearSearch(): void {
    setSearchText("");
  }

  function setSearch(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setSearchText(value);
  }

  return (
    <React.Fragment>
      <SearchBar
        screenName={screenName}
        reset={clearSearch}
        handleChange={setSearch}
        searchValue={searchText}
        onEnter={undefined}
        placeHolder={"Enter order no or phone no"}
      />
      <BotigaPageView>
        {orderList.length === 0 ? (
          <div className={"no-order-container"}>
            <div className="no-order">
              <img
                className={"no-order-image"}
                alt={"no-order"}
                src={boxOpen}
              />
              <span className="primaryInfo">There are no items here</span>
              <span className="secondaryInfo ">
                Enter order no or customer phone no to see orders and order
                details.
              </span>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <OrderList
              selectedOrderNumber={""}
              setSelectedOrderNumber={(n) => {}}
              orders={[]}
            />
            {/* <OrderDetails
              setOrderDelayed={setOrderDelayed}
              setDeliveryStausForOrder={setDeliveryStausForOrder}
              setOrderCancelled={setOrderCancelled}
              setOrderRefundComplete={setOrderRefundComplete}
              selectedOrder={getSelectedOrder(selectedOrderNumber)}
              isProcessingOrder={isProcessingOrder}
            /> */}
          </React.Fragment>
        )}
      </BotigaPageView>
    </React.Fragment>
  );
}
