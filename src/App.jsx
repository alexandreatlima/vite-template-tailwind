import { Route, Routes } from "react-router-dom";
import { AuthContextComponent } from "./contexts/authContext";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";

import { ProtectedRoute } from "./components/ProtectedRoute";

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
              path="/profile"
              element={<ProtectedRoute component={Profile} />}
            />

            <Route path="*" element={<Error />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </>
  );
}

export default App;
