import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Fleet", path: "/fleet" },
    { name: "Odisha Tours", path: "/tours" },
    { name: "Offers", path: "/offers" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="w-full bg-[#1E3A2B] text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="h-[76px] flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#D96B43] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">OD</span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                OdishaDrive
              </h1>

              <p className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-[#F4EFEA]/70">
                Self Drive • Explore Odisha
              </p>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#D96B43]"
                      : "text-[#F4EFEA]/85 hover:text-white"
                  }`
                }
              >
                {link.name}

                {link.name === "Offers" && (
                  <span className="absolute -top-4 -right-4 text-[8px] px-1.5 py-0.5 bg-[#D96B43] text-white font-bold rounded">
                    NEW
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <NavLink
              to="/signup"
              className="text-sm font-medium text-[#F4EFEA]/85 hover:text-[#D96B43] transition"
            >
              Login / Register
            </NavLink>

            <NavLink
              to="/manage-booking"
              className="px-5 py-2.5 bg-[#D96B43] text-white text-sm font-semibold rounded-lg hover:bg-[#C55A35] transition"
            >
              Manage Booking
            </NavLink>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center text-lg"
            aria-label="Toggle navigation"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#172F23] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 py-5">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `py-3.5 border-b border-white/10 text-sm font-medium transition ${
                      isActive
                        ? "text-[#D96B43]"
                        : "text-[#F4EFEA]/85 hover:text-[#D96B43]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-col gap-3 mt-5">
              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 border border-white/20 rounded-lg text-[#F4EFEA] text-sm font-medium hover:border-[#D96B43] hover:text-[#D96B43] transition"
              >
                Login / Register
              </NavLink>

              <NavLink
                to="/manage-booking"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 bg-[#D96B43] text-white rounded-lg text-sm font-semibold hover:bg-[#C55A35] transition"
              >
                Manage Booking
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
