import React, { useContext } from "react";
import "./SideBar.css";
import avatar from "../../assets/avataruser.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SideBar({ handleEditProfileClick, handleLogoutClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sideBar">
      <div className="sideBar__profile">
        <img
          src={currentUser?.avatar}
          alt="sideBar avatar"
          className="sideBar__avatar"
        />
        <p className="sideBar__username">{currentUser?.name}</p>
      </div>
      <button
        type="button"
        className="edit__profile-button"
        onClick={handleEditProfileClick}
      >
        change profile data
      </button>
      <button
        type="button"
        className="logout-button"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </aside>
  );
}
