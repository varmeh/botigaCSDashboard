import paidStamp from "../../../assets/icons/paid.svg";
import { statusMessage, statusColor } from "../../../helpers/utils";
import Payment from "../../../types/payment";
import Order from "../../../types/order";
import Buyer from "../../../types/buyer";

import "./order-list.scss";

type order = {
  buyer: Buyer;
  order: Order;
  payment: Payment;
};
type itemProps = {
  order: order;
  setSelectedOrderNumber: (orderNumber: string) => void;
  selectedOrderNumber: string;
};
type orderListProps = {
  orders: order[];
  setSelectedOrderNumber: (orderNumber: string) => void;
  selectedOrderNumber: string;
};

function Header(): JSX.Element {
  return (
    <div className="order-header-item">
      <div className="order-header-name">ORDERS</div>
    </div>
  );
}

function Item({
  order,
  setSelectedOrderNumber,
  selectedOrderNumber,
}: itemProps): JSX.Element {
  const {
    buyer: { house, name },
    order: { number, products, totalAmount, status: orderStatus },
    payment: { status: paymentStatus },
  } = order;

  const itemText: string =
    products.length > 1
      ? `${products.length} items`
      : `${products.length} item`;

  function selectOrder(): void {
    setSelectedOrderNumber(number);
  }

  const selectedClass: string =
    selectedOrderNumber === number ? "order-item item_selected" : "order-item";

  return (
    <div className={selectedClass} onClick={selectOrder}>
      <div className="order-item-row-container">
        <div className="order-item-row">
          <div className="no-class">
            <div className="order-info">
              {house}, {name}
            </div>
            <div className="delivery-info uppercase">
              #{number} . {itemText}
            </div>
          </div>
          <div className="order-status">
            <span className={statusColor(orderStatus)} />
            {statusMessage(orderStatus)}
          </div>
        </div>
        <div className="delivery-item-row">
          <div className="delivery-info total-amount">₹{totalAmount}</div>
          {paymentStatus === "success" ? (
            <div className="paid-stamp-conatiner">
              <img alt="paid-stamp" src={paidStamp} className="paid-stamp" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function OrderList({
  orders,
  selectedOrderNumber,
  setSelectedOrderNumber,
}: orderListProps): JSX.Element {
  return (
    <div className="order-list-style">
      <Header />
      <div className="order-list-body">
        {orders.length > 0 ? (
          orders.map((order, i) => (
            <Item
              key={i}
              order={order}
              selectedOrderNumber={selectedOrderNumber}
              setSelectedOrderNumber={setSelectedOrderNumber}
            />
          ))
        ) : (
          <div className="no-slection no-slection-border-top">
            No result found
          </div>
        )}
      </div>
    </div>
  );
}
