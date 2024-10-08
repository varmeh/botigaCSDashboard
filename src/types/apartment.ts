export interface Contact {
  phone: string;
  whatsapp: string;
  email: string;
}

export default interface Apartment {
  apartmentArea: string;
  apartmentName: string;
  contact: Contact;
  deliveryFee: number;
  deliveryMessage: string;
  deliveryMinOrder: number;
  deliverySlot?: string;
  live: boolean;
  _id: string;
}

export interface ApartmentShort {
  _id: string;
  name: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

export interface marketingBanners {
  id: string;
  sellerId: string;
  url: string;
}
export interface marketingSellers {
  _id: string;
  brandName: string;
}
export interface ApartmentWithBannerDetails {
  _id: string;
  marketingBanners: marketingBanners[];
  sellers: marketingSellers[];
}
