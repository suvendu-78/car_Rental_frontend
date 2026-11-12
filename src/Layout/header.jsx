import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, UserRound } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Fleet", path: "/Fleets" },
    { name: "Odisha Tours", path: "/OdishaTours" },
    { name: "Offers", path: "/offer", badge: "NEW" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => setIsOpen(false);

  // Check whether the user is logged in
  useEffect(() => {
    let active = true;

    const checkLogin = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/users/Get_users`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (active) {
          setIsLoggedIn(response.ok);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        if (active) {
          setIsLoggedIn(false);
        }
      } finally {
        if (active) {
          setCheckingAuth(false);
        }
      }
    };

    setCheckingAuth(true);
    checkLogin();

    return () => {
      active = false;
    };
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `relative inline-flex items-center gap-1.5 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? "font-semibold text-white"
        : "font-normal text-white/75 hover:text-white"
    }`;

  const goToDashboard = () => {
    closeMenu();
    navigate("/account/dashboard");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1E3A2B] text-white">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-5">
          {/* Brand */}
          <NavLink
            to="/"
            onClick={closeMenu}
            aria-label="MapMySafar home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src="/images/Logo.jpeg"
              alt="MapMySafar Logo"
              className="h-12 w-12 rounded-lg object-contain"
            />

            <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                MapMySafar
              </h1>

              <p className="text-[9px] tracking-[0.18em] text-white/70">
                YOUR JOURNEY, OUR PRIORITY
              </p>
            </div>
          </NavLink>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 xl:flex 2xl:gap-7"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>

                    {link.badge && (
                      <span className="absolute -right-5 -top-0.5 rounded bg-[#D96B43] px-1 py-0.5 text-[8px] font-medium leading-none text-white">
                        {link.badge}
                      </span>
                    )}

                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-[17px] h-0.5 rounded-full bg-white" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-4 xl:flex">
            {checkingAuth ? (
              <div
                className="h-9 w-9 animate-pulse rounded-full bg-white/10"
                aria-label="Checking login status"
              />
            ) : isLoggedIn ? (
              <button
                type="button"
                onClick={goToDashboard}
                title="My Account"
                aria-label="My Account"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
              >
                <UserRound size={22} />
              </button>
            ) : (
              <NavLink
                to="/signup"
                className="text-sm font-normal text-white/80 transition hover:text-white"
              >
                Login / Register
              </NavLink>
            )}

            <NavLink
              to="/manage-booking"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D96B43] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#C55A35]"
            >
              Manage Booking
              <ArrowRight size={15} />
            </NavLink>
          </div>

          {/* Tablet/mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            {!checkingAuth &&
              (isLoggedIn ? (
                <button
                  type="button"
                  onClick={goToDashboard}
                  title="My Account"
                  aria-label="My Account"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white/10"
                >
                  <UserRound size={21} />
                </button>
              ) : (
                <NavLink
                  to="/signup"
                  onClick={closeMenu}
                  className="hidden rounded-lg border border-white/25 px-3 py-2 text-xs font-medium text-white transition hover:bg-white/10 sm:inline-flex"
                >
                  Login
                </NavLink>
              ))}

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10"
            >
              {isOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#193327] transition-[max-height,opacity] duration-300 xl:hidden ${
          isOpen
            ? "max-h-[600px] opacity-100"
            : "pointer-events-none max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname === link.path ||
                    location.pathname.startsWith(`${link.path}/`);

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMenu}
                  className={`flex min-h-11 items-center justify-between border-b border-white/10 py-3 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-white"
                      : "font-normal text-white/75 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}

                    {link.badge && (
                      <span className="rounded bg-[#D96B43] px-1.5 py-0.5 text-[9px] text-white">
                        {link.badge}
                      </span>
                    )}
                  </span>

                  {isActive && <ArrowRight size={16} />}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {!checkingAuth &&
              (isLoggedIn ? (
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <UserRound size={18} />
                  My Account
                </button>
              ) : (
                <NavLink
                  to="/signup"
                  onClick={closeMenu}
                  className="flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Login / Register
                </NavLink>
              ))}

            <NavLink
              to="/manage-booking"
              onClick={closeMenu}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#D96B43] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#C55A35]"
            >
              Manage Booking
              <ArrowRight size={15} />
            </NavLink>
          </div>

          <p className="mt-4 text-center text-[10px] tracking-wide text-white/45">
            MapMySafar · Self Drive · Explore Odisha
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
