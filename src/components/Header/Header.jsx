import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/avataruser.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleModalRegisterClick,
  handleModalLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name
    ? currentUser.name[0].toUpperCase()
    : "";

  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="website logo" className="header__logo" />
      </NavLink>
      <p className="header__data-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <div className="header__user-container">
            <NavLink className="header__navigation" to="/profile">
              <p className="header__username">{currentUser?.name || "User"}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser?.avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">{userInitial}</div>
              )}
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <button
            className="header__signup-btn"
            onClick={handleModalRegisterClick}
          >
            Signup
          </button>
          <button className="header__login-btn" onClick={handleModalLoginClick}>
            Login
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
