import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({
  onCardClick,
  clothingItems,
  onAddClick,
  isLoggedIn,
  handleEditProfileClick,
  handleLogoutClick,
  onCardLike,
}) {
  return (
    <section className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleLogoutClick={handleLogoutClick}
      />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
