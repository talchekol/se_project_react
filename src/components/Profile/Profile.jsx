import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

export default function Profile({ onCardClick, clothingItems }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} />
    </section>
  );
}
