import { NavLink } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/avataruser.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="website logo" className="header__logo" />
      </NavLink>
      <p className="header__data-and-location">
        {currentDate},{weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <NavLink className="header__navigation" to="/profile">
          <p className="header__username">TAL CHEKOL</p>{" "}
        </NavLink>
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
