import "./ModalWithForm.css";
import closeButton from "../../assets/Modalclosebutton.svg";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
  secondaryButtonText,
  onSecondaryButtonClick,
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
          <img src={closeButton} alt="close button" />
        </button>
        <form onSubmit={onSubmit} action="" className="modal__form">
          {children}
          <div className="modal__button-row">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
