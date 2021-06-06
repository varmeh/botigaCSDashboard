import { NavLink } from "react-router-dom";
import "./side-nav.scss";

const defaultMenuItemProps = {
  image: "",
  text: "",
  to: "",
  isLogout: false,
  handleLogout: () => {},
};

type menuItemProps = {
  image: string;
  text: string;
  to?: string;
  isLogout?: boolean;
  handleLogout?: () => void;
} & typeof defaultMenuItemProps;

const MenuIconItem = ({
  image,
  text,
  to,
  isLogout,
  handleLogout,
}: menuItemProps): JSX.Element => {
  if (isLogout) {
    return (
      <div className="menu-icon-items logout-menu-item" onClick={handleLogout}>
        <img className="image-icon" alt={text} src={image} />
        <span className="text-icon">{text}</span>
      </div>
    );
  }
  return (
    <NavLink to={to} className="menu-icon-items">
      <img className="image-icon" alt={text} src={image} />
      <span className="text-icon">{text}</span>
    </NavLink>
  );
};

MenuIconItem.defaultProps = defaultMenuItemProps;

export default MenuIconItem;
