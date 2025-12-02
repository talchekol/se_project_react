import "./ItemModal.css";
import Closebutton from "../../assets/Modalclosebutton.svg";

function ItemModal({ activeModal, closeActiveModal, card }) {
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
          <img src={Closebutton} alt="close button" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather"> Wearher: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
