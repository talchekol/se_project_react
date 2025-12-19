import "./Header.css";
import logo from "../../assets/headerLogo.svg";
import avatar from "../../assets/avataruser.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="website logo" className="header__logo" />
      <p className="header__data-and-location">
        {currentDate},{weatherData.city}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">TAL CHEKOL</p>
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
