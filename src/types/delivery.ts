import Buyer from "./buyer";
import Order from "./order";
import Payment from "./payment";
import Refund from "./refund";

export default interface Delivery {
  buyer: Buyer;
  createdAt: string;
  order: Order;
  payment: Payment;
  _id: string;
  refund?: Refund;
}
