export default interface Payment {
  description: string;
  orderId: string;
  paymentId: string;
  paymentMode: string;
  status: string;
  transferId: string;
  transferredAmount: number;
  _id: string;
}
