import React from "react";
import { errorType } from "../types/error";
import { ApartmentShort } from "../types/apartment";
import Seller from "../types/seller";

interface IContext {
  approvedSellers: Seller[];
  apartments: ApartmentShort[];
  brandName: string;
  setBrandName: (name: string) => void;
  setApprovedSeller: (sellers: Seller[]) => void;
  setApartments: (apartments: ApartmentShort[]) => void;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  setError: (value: boolean, err?: errorType) => void;
  clearContext: () => void;
}

const AppContext = React.createContext<IContext>({} as IContext);

export default AppContext;
