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
  deliverySlot: string;
  live: boolean;
  _id: string;
}
