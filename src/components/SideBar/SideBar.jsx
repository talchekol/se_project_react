import "./SideBar.css";
import avatar from "../../assets/avataruser.png";

export default function SideBar() {
  return (
    <aside className="sideBar">
      <div className="sideBar__profile">
        <img src={avatar} alt="sideBar avatar" className="sideBar__avatar" />
        <p className="sideBar__username">TAL CHEKOL</p>
      </div>
    </aside>
  );
}
