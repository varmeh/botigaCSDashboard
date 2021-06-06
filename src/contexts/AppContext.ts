import React from "react";
import { errorType } from "../types/error";

interface IContext {
  brandName: string;
  setBrandName: (name: string) => void;
  showMainViewLoader: () => void;
  hideMainViewLoader: () => void;
  setError: (value: boolean, err?: errorType) => void;
  clearContext: () => void;
}

const AppContext = React.createContext<IContext>({} as IContext);

export default AppContext;
