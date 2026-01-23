import "./ItemModal.css";
import closeButton from "../../assets/Modalclosebutton.svg";

function ItemModal({ activeModal, closeActiveModal, card, onOpenConfirm }) {
  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={closeButton} alt="close button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-row">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              onClick={onOpenConfirm}
              type="button"
              className="modal__delete-button"
            >
              Delete Item
            </button>
          </div>
          <p className="modal__weather"> Wearher: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
