import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { ProtectedBusinessRoute } from "./components/ProtectedRoutes/protectedBusinessRoute.jsx";
import { ProtectedClientRoute } from "./components/ProtectedRoutes/protectedClientRoute.jsx";
import { ClientDiscover } from "./pages/ClientDiscover";
import { ClientProductDetails } from "./pages/ClientProductDetails";

function App() {
  return (
    <>
      <div class="App bg-slate-200">
        <AuthContextComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user/profile"
              element={<ProtectedClientRoute component={Profile} />}
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
