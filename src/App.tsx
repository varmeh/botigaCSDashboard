import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SideNav } from "./components/common/side-nav/side-nav";
import { Error } from "./components/common/error/error";
import { AppRoutes } from "./components/app-routes";
import {
  VERIFY_OTP_VIEW,
  LOGIN_VIEW,
  HOME_VIEW,
} from "./helpers/BotigaRouteFile";

import AppContext from "./contexts/AppContext";

import { errorType } from "./types/error";
import Seller from "./types/seller";

import { fetchProfile } from "./services/auth-service";

import "./App.scss";

const SIDE_NAVIGATION_HIDDEN_FOR_ROUTES: string[] = [
  LOGIN_VIEW,
  VERIFY_OTP_VIEW,
];
type AppState = {
  approvedSellers: Seller[];
  brandName: string;
  error: errorType;
  isError: boolean;
  isMainViewLoading: boolean;
};

class MyApp extends React.Component<RouteComponentProps, AppState> {
  state: AppState = {
    approvedSellers: [],
    brandName: "",
    error: null,
    isError: false,
    isMainViewLoading: false,
  };

  async componentDidMount() {
    try {
      const { data } = await fetchProfile();
      if (data.brand) {
        this._setBrandName(data.brand.name);
      }
      this.props.history.replace(HOME_VIEW);
    } catch (err) {
      this._setError(true, err);
      this.props.history.replace(LOGIN_VIEW);
    }
  }

  _clearContext = (): void =>
    this.setState({
      approvedSellers: [],
      brandName: "",
      error: null,
      isError: false,
      isMainViewLoading: false,
    });

  _setError = (value: boolean, err?: errorType): void =>
    this.setState({
      isError: value,
      error: err ? err : null,
    });

  _setBrandName = (name: string): void => this.setState({ brandName: name });

  _showMainViewLoader = (): void => this.setState({ isMainViewLoading: true });

  _hideMainViewLoader = (): void => this.setState({ isMainViewLoading: false });

  _setApprovedSeller = (sellers: Seller[]): void =>
    this.setState({ approvedSellers: sellers });

  render(): JSX.Element {
    const {
      location: { pathname = "" },
    } = this.props;

    const includeSideBar: boolean =
      !SIDE_NAVIGATION_HIDDEN_FOR_ROUTES.includes(pathname);

    const { isError, error, isMainViewLoading, brandName, approvedSellers } =
      this.state;

    return (
      <AppContext.Provider
        value={{
          approvedSellers: approvedSellers,
          brandName: brandName,
          setBrandName: this._setBrandName,
          setApprovedSeller: this._setApprovedSeller,
          showMainViewLoader: this._showMainViewLoader,
          hideMainViewLoader: this._hideMainViewLoader,
          setError: this._setError,
          clearContext: this._clearContext,
        }}
      >
        <div className="app">
          {includeSideBar && <SideNav />}
          <div
            className={
              includeSideBar
                ? "main-content-sidebar"
                : "main-content-no-sidebar"
            }
          >
            <div className={isMainViewLoading ? "disable-container" : "no-css"}>
              {isMainViewLoading && (
                <div className="view-loader">
                  <CircularProgress />
                </div>
              )}
              <AppRoutes />
            </div>
          </div>
          {isError && <Error err={error} />}
        </div>
      </AppContext.Provider>
    );
  }
}

export const App = withRouter(MyApp);
