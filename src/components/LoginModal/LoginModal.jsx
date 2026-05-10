import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  onLogin,
  closeActiveModal,
  onRegisterClick,
  errorMessage,
}) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values, resetForm);
  }

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      buttonText="Log in"
      secondaryButtonText="or Register"
      onSecondaryButtonClick={onRegisterClick}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          id="login-password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      {errorMessage && <p className="modal__error-message">{errorMessage}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
