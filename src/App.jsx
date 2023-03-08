import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { Favorites } from "./pages/Favorites";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ClientOrder } from "./pages/ClientOrder";
import { ViewProfile } from "./pages/ViewProfile";
import { Discover } from "./pages/Discover";

function App() {
  return (
    <>
      <div>
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user/profile"
              element={<ProtectedRoute component={Profile} />}
            />
            <Route path="/user/viewProfile" element={<ViewProfile />} />
            <Route path="/user/order" element={<ClientOrder />} />
            <Route path="/user/favorites" element={<Favorites />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
