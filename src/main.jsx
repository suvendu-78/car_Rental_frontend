import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
const Applay = lazy(() => import("./Layout/Applayout.jsx"));
const Home = lazy(() => import("./page/Home.jsx"));
const OdishaMap = lazy(() => import("./map/map.jsx"));
const SoloRide = lazy(() => import("./page/solo.jsx"));
const Signup = lazy(() => import("./page/signup.jsx"));
const Login = lazy(() => import("./page/login.jsx"));
import Skeleton from "./Layout/skeliton.jsx";

const Root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Applay />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/map",
        element: <OdishaMap />,
      },
      {
        path: "/solo",
        element: <SoloRide />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <RouterProvider router={Root} />
  </StrictMode>,
);
