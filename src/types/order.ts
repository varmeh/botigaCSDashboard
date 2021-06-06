import Product from "./product";

export default interface Order {
  couponCode: string;
  deliveryFee: number;
  deliverySlot: string;
  discountAmount: number;
  expectedDeliveryDate: string;
  number: string;
  products: Product[];
  status: string;
  totalAmount: number;
}
