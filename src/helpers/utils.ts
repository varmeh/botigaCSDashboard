export const isOpen = (status: string): boolean => status === "open";
export const isDelayed = (status: string): boolean => status === "delayed";
export const isOutForDelivery = (status: string): boolean => status === "out";
export const isDelivered = (status: string): boolean => status === "delivered";
export const isCancelled = (status: string): boolean => status === "cancelled";
export const isCompleted = (status: string): boolean =>
  isDelivered(status) || isCancelled(status);

export function statusMessage(status: string): string {
  if (isOpen(status)) {
    return "Order Placed";
  } else if (isOutForDelivery(status)) {
    return "Shipped";
  } else if (isDelivered(status)) {
    return "Delivered";
  } else if (isDelayed(status)) {
    return "Delivery Date Changed";
  } else if (isCancelled(status)) {
    return "Cancelled";
  } else {
    return status;
  }
}

export function statusColor(status: string): string {
  if (isDelivered(status)) {
    return "delivered";
  } else if (isOpen(status)) {
    return "open";
  } else if (isOutForDelivery(status)) {
    return "out-for-delivery";
  } else if (isDelayed(status)) {
    return "delayed";
  } else if (isCancelled(status)) {
    return "canelled";
  } else if (status === "all") {
    return "all";
  } else if (status === "only-open") {
    return "only-open";
  } else {
    return "default";
  }
}
