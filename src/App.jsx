import { Routes, Route, Navigate } from "react-router-dom";

import AccountLayout from "./userProfile/AccountLayout";

import Account from "./userProfile/Account.jsx";
import Bookings from "./userProfile/booking.jsx";
import Explore from "./userProfile/explore.jsx";
import Fleet from "./userProfile/fleet.jsx";
import Payments from "./userProfile/payment.jsx";
import Wishlist from "./userProfile/wishlist.jsx";
import Profile from "./userProfile/profile.jsx";
import Settings from "./userProfile/settings.jsx";

function App() {
  return (
    <Routes>
      {/* Keep your existing homepage, login and public routes here */}

      <Route path="/account" element={<AccountLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Account />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="explore" element={<Explore />} />
        <Route path="fleet" element={<Fleet />} />
        <Route path="payments" element={<Payments />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
