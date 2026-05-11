import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { addItem, getItems, removeItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  //states
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //handelrs
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleModalRegisterClick = () => {
    setActiveModal("Signup");
  };

  const handleModalLoginClick = () => {
    setActiveModal("Login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("Edit-Profile");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenDeleteConfirm = () => {
    setActiveModal("confirm-delete");
  };

  const onAddItem = (inputValues, resetForm) => {
    const token = localStorage.getItem("jwt");

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegistration = ({ name, avatar, email, password }, resetForm) => {
    return auth
      .signup({ name, avatar, email, password })
      .then(() => {
        resetForm();
        closeActiveModal();
        navigate("/profile");
        return handleLogin({ email, password });
      })
      .catch((err) => console.error(err));
  };

  const handleLogin = ({ email, password }, resetForm) => {
    if (!email || !password) {
      return;
    }
    setErrorMessage("");
    auth
      .signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          if (res.user) {
            return res.user;
          } else {
            return auth.checkToken(res.token);
          }
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          resetForm();
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setErrorMessage("Incorrect email or password");
      });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("jwt");
    removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  function handleAddItem(item) {
    const token = localStorage.getItem("jwt");

    return api
      .addItem(item, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch(console.error);
  }

  function handleDeleteItem(id) {
    const token = localStorage.getItem("jwt");

    return api
      .deleteItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
      })
      .catch(console.error);
  }

  const handleEditProfile = (data) => {
    const token = localStorage.getItem("jwt");

    api
      .editProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");

    const isLiked = likes.some((id) => id === currentUser._id);

    const apiMethod = isLiked ? api.removeCardLike : api.addCardLike;

    apiMethod(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item)),
        );
      })
      .catch((err) => console.error("Error with like logic:", err));
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Token validation error:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleModalLoginClick={handleModalLoginClick}
              handleModalRegisterClick={handleModalRegisterClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      handleLogoutClick={handleLogoutClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              closeActiveModal={closeActiveModal}
              onAddItem={onAddItem}
            ></AddItemModal>
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              closeActiveModal={closeActiveModal}
              onOpenConfirm={handleOpenDeleteConfirm}
            />
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm-delete"}
              closeActiveModal={closeActiveModal}
              onConfirm={handleConfirmDelete}
            />
            <RegisterModal
              isOpen={activeModal === "Signup"}
              onRegister={handleRegistration}
              closeActiveModal={closeActiveModal}
            />
            <LoginModal
              isOpen={activeModal === "Login"}
              closeActiveModal={closeActiveModal}
              onLogin={handleLogin}
              errorMessage={errorMessage}
            />
            <EditProfileModal
              isOpen={activeModal === "Edit-Profile"}
              onEditProfile={handleEditProfile}
              closeActiveModal={closeActiveModal}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
