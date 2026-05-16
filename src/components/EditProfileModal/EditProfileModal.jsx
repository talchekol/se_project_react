import React, { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import "./EditProfileModal.css";

const EditProfileModal = ({
  isOpen,
  onEditProfile,
  closeActiveModal,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(values);
  }

  return (
    <ModalWithForm
      title="change profile data"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      name="edit-profile"
    >
      <label className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar *
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={values.avatar || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
