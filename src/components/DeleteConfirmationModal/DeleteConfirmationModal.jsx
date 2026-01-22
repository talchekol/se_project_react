import "./DeleteConfirmationModal.css";
import Closebutton from "../../assets/Modalclosebutton.svg";

function DeleteConfirmationModal({ isOpen, closeActiveModal, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="modal modal__opened">
      <div className="modal__content modal__content_confirm">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img src={Closebutton} alt="close button" />
        </button>

        <p className="modal__confirm-text">
          Are you sure you want to delete this item? <br />
          This action is irreversible.
        </p>

        <button
          className="modal__confirm-yes"
          type="button"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          className="modal__confirm-cancel"
          type="button"
          onClick={closeActiveModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
