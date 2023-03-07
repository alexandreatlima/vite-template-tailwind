import { Link } from "react-router-dom";

export function ClientNavBar() {
  return (
    <nav>
      <Link to="/user/profile">
        <button>Profile</button>
      </Link>
      <Link to="/user/discover">
        <button>Discover</button>
      </Link>
      <Link to="/user/favorites">
        <button>Favorites</button>
      </Link>
    </nav>
  );
}
