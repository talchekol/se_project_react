import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import closeButton from "../../assets/Modalclosebutton.svg";

function ItemModal({ activeModal, closeActiveModal, card, onOpenConfirm }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;
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
            {isOwn && (
              <button
                onClick={onOpenConfirm}
                type="button"
                className={itemDeleteButtonClassName}
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="modal__weather"> Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
