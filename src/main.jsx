import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./index.css";
import Skeleton from "./Layout/skeliton.jsx";

// Existing website pages
const Applay = lazy(() => import("./Layout/Applayout.jsx"));
const Home = lazy(() => import("./page/Home.jsx"));
const OdishaMap = lazy(() => import("./map/map.jsx"));
const SoloRide = lazy(() => import("./page/solo.jsx"));
const Signup = lazy(() => import("./page/signup.jsx"));
const Login = lazy(() => import("./page/login.jsx"));
const About = lazy(() => import("./page/about.jsx"));
const Offers = lazy(() => import("./page/offer.jsx"));
const CityRide = lazy(() => import("./page/city_booking/instantpickup.jsx"));
const RideOptions = lazy(() => import("./page/city_booking/booking.jsx"));
const ForgotPassword = lazy(() => import("./page/forgatePassword.jsx"));
import PaymentPage from "./page/payment/paymmentpage.jsx";
const Fleet = lazy(() => import("./page/flet.jsx"));
const BookingSuccess = lazy(
  () => import("./page/city_booking/confirm_page.jsx"),
);
const ResetPassword = lazy(() => import("./page/PasswordReset.jsx"));
const TourBooking = lazy(() => import("./page/Tour/Tourbook.jsx"));
const Tours = lazy(() => import("./page/Tour/Tour.jsx"));

// Account layout and pages
const AccountLayout = lazy(() => import("./userProfile/AccountLayout.jsx"));

const Account = lazy(() => import("./userProfile/Account.jsx"));
const Bookings = lazy(() => import("./userProfile/booking.jsx"));
const Explore = lazy(() => import("./userProfile/explore.jsx"));
const Fleets = lazy(() => import("./userProfile/fleet.jsx"));
const Payments = lazy(() => import("./userProfile/payment.jsx"));
const Wishlist = lazy(() => import("./userProfile/wishlist.jsx"));
const Profile = lazy(() => import("./userProfile/profile.jsx"));
const Settings = lazy(() => import("./userProfile/settings.jsx"));
const VerifyOTP = lazy(() => import("./page/OTP.jsx"));
const Booking = lazy(() => import("./page/booking_self.jsx"));
const OdishaTours = lazy(() => import("./page/OdishToure.jsx"));
const Root = createBrowserRouter([
  // Public website layout
  {
    path: "/",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Applay />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "map",
        element: <OdishaMap />,
      },
      {
        path: "solo",
        element: <SoloRide />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/verifyOTP",
        element: <VerifyOTP />,
      },
      {
        path: "/Booking",
        element: <Booking />,
      },
      {
        path: "/OdishaTours",
        element: <OdishaTours />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/offer",
        element: <Offers />,
      },
      {
        path: "/cityRide",
        element: <CityRide />,
      },
      {
        path: "/rideOptions",
        element: <RideOptions />,
      },
      {
        path: "/bookingSuccess",
        element: <BookingSuccess />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/ForgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/Fleets",
        element: <Fleets />,
      },
      {
        path: "/ResetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/TourBooking/:tourId",
        element: (
          <Suspense fallback={<Skeleton />}>
            <TourBooking />
          </Suspense>
        ),
      },
      {
        path: "/tours",
        element: <Tours />,
      },
    ],
  },

  // Account layout with shared sidebar
  {
    path: "/account",
    element: (
      <Suspense fallback={<Skeleton />}>
        <AccountLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/account/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Account />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "fleet",
        element: <Fleet />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <RouterProvider router={Root} />
  </StrictMode>,
);
