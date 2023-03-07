import { Link } from "react-router-dom";

export function ClientNavBar() {
  const NavBtnClass =
    "w-32 transition-all px-3 py-1 hover:border-2 hover:border-solid hover:border-indigo-800 hover:bg-indigo-500 rounded-lg drop-shadow box-border";
  return (
    <nav className="h-15 flex flex-row items-center justify-evenly p-2 bg-indigo-700 mb-5 font-semibold text-indigo-100 drop-shadow-xl">
      <Link to="/user/profile">
        <button className={NavBtnClass}>Profile</button>
      </Link>
      <Link to="/user/discover">
        <button className={NavBtnClass}>Discover</button>
      </Link>
      <Link to="/user/favorites">
        <button className={NavBtnClass}>Favorites</button>
      </Link>
    </nav>
  );
}
