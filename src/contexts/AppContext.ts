import React from "react";
import { errorType } from "../types/error";
import Seller from "../types/seller";

interface IContext {
  approvedSellers: Seller[];
  brandName: string;
  setBrandName: (name: string) => void;
  setApprovedSeller: (sellers: Seller[]) => void;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  setError: (value: boolean, err?: errorType) => void;
  clearContext: () => void;
}

const AppContext = React.createContext<IContext>({} as IContext);

export default AppContext;
