import "./Footer.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Footer() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__signture">
          Developed by {currentUser?.name || "Anonymous"}
        </p>
        <p className="footer__year">2025</p>
      </div>
    </footer>
  );
}

export default Footer;
