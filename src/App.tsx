import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppContext from "./contexts/AppContext";
import { SideNav } from "./components/common/side-nav/side-nav";
import { Error } from "./components/common/error/error";
import { AppRoutes } from "./components/app-routes";
import { VERIFY_OTP_VIEW, LOGIN_VIEW } from "./helpers/BotigaRouteFile";
import { errorType } from "./types/error";

import "./App.scss";

const SIDE_NAVIGATION_HIDDEN_FOR_ROUTES: string[] = [
  LOGIN_VIEW,
  VERIFY_OTP_VIEW,
];
type AppState = {
  brandName: string;
  error: errorType;
  isError: boolean;
  isMainViewLoading: boolean;
};

class MyApp extends React.Component<RouteComponentProps, AppState> {
  state: AppState = {
    brandName: "",
    error: null,
    isError: false,
    isMainViewLoading: false,
  };

  _clearContext = (): void =>
    this.setState({
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

  render(): JSX.Element {
    const {
      location: { pathname = "" },
    } = this.props;

    const includeSideBar: boolean =
      !SIDE_NAVIGATION_HIDDEN_FOR_ROUTES.includes(pathname);

    const { isError, error, isMainViewLoading, brandName } = this.state;

    return (
      <AppContext.Provider
        value={{
          brandName: brandName,
          setBrandName: this._setBrandName,
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
