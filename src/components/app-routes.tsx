import { Route, Switch } from "react-router-dom";
import { Login } from "./auth/login";
import { VerifyOtp } from "./auth/verify-otp";
import { SearchOrder } from "../pages/search-order/search-order";
import {
  SEARCH_ORDER,
  LOGIN_VIEW,
  VERIFY_OTP_VIEW,
} from "../helpers/BotigaRouteFile";

export function AppRoutes(): JSX.Element {
  return (
    <Switch>
      <Route path={LOGIN_VIEW} exact>
        <Login />
      </Route>
      <Route path={VERIFY_OTP_VIEW} exact>
        <VerifyOtp />
      </Route>
      <Route path={SEARCH_ORDER} exact>
        <SearchOrder />
      </Route>
    </Switch>
  );
}
