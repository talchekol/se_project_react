import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Likebutton from "../../assets/Likebutton.svg";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButton = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <h2 className="card__name">{item.name}</h2>

      {currentUser && (
        <button type="button" className={itemLikeButton} onClick={handleLike}>
          <img src={Likebutton} alt="like button" />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
