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
import { BusinessForm } from "./pages/BusinessForm";
import { BusinessProfile } from "./pages/BussinesProfile";
import { BusinessAdmin } from "./pages/BusinessAdmin";
import { BusinessEdit } from "./pages/BusinessEdit";
import { BusinessOrderDetail } from "./pages/BusinessOrderDetail";
import { BusinessProductDetail } from "./pages/BusinessProductDetail";

function App() {
  return (
    <>
      <div className="App bg-stone-200 h-full">
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
              path="/user/viewOrder/:idOrder"
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
            <Route
              path="/business/admin"
              element={<ProtectedBusinessRoute component={BusinessAdmin} />}
            />
            <Route
              path="/business/admin/profile"
              element={<ProtectedBusinessRoute component={BusinessProfile} />}
            />
            <Route
              path="/business/admin/create-form"
              element={<ProtectedBusinessRoute component={BusinessForm} />}
            />
            <Route
              path="/business/admin/edit"
              element={<ProtectedBusinessRoute component={BusinessEdit} />}
            />
            <Route
              path="/business/admin/viewOrder/:orderId"
              element={
                <ProtectedBusinessRoute component={BusinessOrderDetail} />
              }
            />
            <Route
              path="/business/admin/viewMagic/:idProduct"
              element={
                <ProtectedBusinessRoute component={BusinessProductDetail} />
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
