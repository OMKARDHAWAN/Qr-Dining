import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Offers from "./pages/Offers";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/menu" element={<Menu />} />

      <Route path="/offers" element={<Offers />} />

      <Route path="/orders" element={<Orders />} />

      <Route path="/profile" element={<Profile />} />

      <Route
        path="/profile-overview"
        element={<ProfileOverview />}
      />
    </Routes>
  );
}

export default App;