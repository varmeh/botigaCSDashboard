import { withRouter, RouteComponentProps } from "react-router-dom";
import MenuIconItem from "./menu-item";
import Logo from "../../../assets/icons/logo.svg";
import Delivery from "../../../assets/icons/delivery.svg";
import Notification from "../../../assets/icons/notification.svg";
import Search from "../../../assets/icons/search.svg";
import Logout from "../../../assets/icons/logout.svg";

import {
  LOGIN_VIEW,
  DELIVERY_VIEW,
  NOTIFICATION_VIEW,
  SEARCH_ORDER,
} from "../../../helpers/BotigaRouteFile";

import "./side-nav.scss";

export const SideNav = withRouter(
  ({ history }: RouteComponentProps): JSX.Element => {
    async function handleLogout(): Promise<void> {
      try {
        history.push(LOGIN_VIEW);
      } catch (err) {}
    }

    return (
      <div className="side-nav">
        <img className="botiga-logo" alt="botiga-logo" src={Logo} />
        <MenuIconItem image={Delivery} text={"Delivery"} to={DELIVERY_VIEW} />
        <MenuIconItem
          image={Notification}
          text={"Alerts"}
          to={NOTIFICATION_VIEW}
        />
        <MenuIconItem image={Search} text={"Search"} to={SEARCH_ORDER} />
        <MenuIconItem
          image={Logout}
          text={"Logout"}
          isLogout
          handleLogout={handleLogout}
        />
      </div>
    );
  }
);
