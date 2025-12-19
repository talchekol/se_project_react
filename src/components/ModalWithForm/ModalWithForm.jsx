import "./ModalWithForm.css";
import Closebutton from "../../assets/Modalclosebutton.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="form__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={Closebutton} alt="close button" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
