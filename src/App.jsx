import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { Favorites } from "./pages/Favorites";
import { ClientOrder } from "./pages/ClientOrder";
import { ViewProfile } from "./pages/ViewProfile";
import { ProtectedBusinessRoute } from "./components/ProtectedRoutes/protectedBusinessRoute.jsx";
import { ProtectedClientRoute } from "./components/ProtectedRoutes/protectedClientRoute.jsx";
import { ClientDiscover } from "./pages/ClientDiscover";
import { ClientProductDetails } from "./pages/ClientProductDetails";
import { DiscoverNotClient } from "./pages/DiscoverNotClient";

function App() {
  return (
    <>
      <div class="App bg-indigo-100">
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/discover" element={<DiscoverNotClient />} />
            <Route
              path="/user/profile"
              element={<ProtectedClientRoute component={Profile} />}
            />
            <Route
              path="/user/viewProfile"
              element={<ProtectedClientRoute component={ViewProfile} />}
            />
            <Route
              path="/user/order"
              element={<ProtectedClientRoute component={ClientOrder} />}
            />
            <Route
              path="/user/favorites"
              element={<ProtectedClientRoute component={Favorites} />}
            />
            <Route
              path="/user/discover"
              element={<ProtectedClientRoute component={ClientDiscover} />}
            />
            <Route
              path="/user/viewMagic/:idMagic"
              element={
                <ProtectedClientRoute component={ClientProductDetails} />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
