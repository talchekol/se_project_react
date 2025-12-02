import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinats, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setweatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setactiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setactiveModal("Add-clothes-form");
  };

  const closeActiveModal = () => {
    setactiveModal("");
  };

  const handleCardClick = (card) => {
    setactiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinats, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setweatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <div className="app__content">
        <Header handleAddClick={setactiveModal} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <ModalWithForm
          buttonText="Add garment"
          title="New garment"
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
        >
          <label htmlFor="" className="modal__label">
            Name{""}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="" className="modal__label">
            Image{""}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>

            <label
              htmlFor="hot"
              className="modal__label modal__label__type__radio"
            >
              <input type="radio" className="modal__radio-input" />
              Hot
            </label>

            <label
              htmlFor="warm"
              className="modal__label modal__label__type__radio"
            >
              <input id="warm" type="radio" className="modal__radio-input" />
              Warm
            </label>

            <label
              htmlFor="cold"
              className="modal__label modal__label__type__radio"
            >
              <input id="cold" type="radio" className="modal__radio-input" />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
        />
      </div>
    </div>
  );
}

export default App;
