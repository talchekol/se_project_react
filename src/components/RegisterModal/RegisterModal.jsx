import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onRegister,
  closeActiveModal,
  onLoginClick,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatar: "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values, resetForm);
    console.log(values);
  }

  return (
    <ModalWithForm
      title="Signup"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      buttonText="Next"
      secondaryButtonText="or Log in"
      onSecondaryButtonClick={onLoginClick}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label htmlFor="password" className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          id="avatar"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
