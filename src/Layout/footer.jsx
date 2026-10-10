import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#172F23] text-[#F4EFEA]">
      <div className="h-1 bg-[#D96B43]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 lg:pr-12">
            <NavLink to="/" className="inline-flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#D96B43] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">OD</span>
              </div>

              <div>
                <h2 className="text-xl font-bold">OdishaDrive</h2>

                <p className="text-[9px] uppercase tracking-[0.2em] text-[#F4EFEA]/60">
                  Self Drive • Explore Odisha
                </p>
              </div>
            </NavLink>

            <p className="max-w-md text-sm leading-7 text-[#F4EFEA]/65">
              Discover Odisha your way. From coastal roads and ancient temples
              to national parks and peaceful hill destinations, make every
              journey memorable.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 border border-[#F4EFEA]/20 rounded-lg flex items-center justify-center text-sm hover:bg-[#D96B43] hover:border-[#D96B43] transition"
              >
                f
              </a>

              <a
                href="#"
                className="w-9 h-9 border border-[#F4EFEA]/20 rounded-lg flex items-center justify-center text-sm hover:bg-[#D96B43] hover:border-[#D96B43] transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-9 h-9 border border-[#F4EFEA]/20 rounded-lg flex items-center justify-center text-sm hover:bg-[#D96B43] hover:border-[#D96B43] transition"
              >
                ◎
              </a>

              <a
                href="#"
                className="w-9 h-9 border border-[#F4EFEA]/20 rounded-lg flex items-center justify-center text-sm hover:bg-[#D96B43] hover:border-[#D96B43] transition"
              >
                ▶
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 text-white">Explore</h3>

            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className="text-sm text-[#F4EFEA]/60 hover:text-[#D96B43] transition"
              >
                Home
              </NavLink>

              <NavLink
                to="/fleet"
                className="text-sm text-[#F4EFEA]/60 hover:text-[#D96B43] transition"
              >
                Our Fleet
              </NavLink>

              <NavLink
                to="/tours"
                className="text-sm text-[#F4EFEA]/60 hover:text-[#D96B43] transition"
              >
                Odisha Tours
              </NavLink>

              <NavLink
                to="/offers"
                className="text-sm text-[#F4EFEA]/60 hover:text-[#D96B43] transition"
              >
                Offers
              </NavLink>

              <NavLink
                to="/about"
                className="text-sm text-[#F4EFEA]/60 hover:text-[#D96B43] transition"
              >
                About Us
              </NavLink>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 text-white">Services</h3>

            <div className="flex flex-col gap-3">
              <span className="text-sm text-[#F4EFEA]/60">
                Self-Drive Rentals
              </span>

              <span className="text-sm text-[#F4EFEA]/60">With Driver</span>

              <span className="text-sm text-[#F4EFEA]/60">
                Airport Transfer
              </span>

              <span className="text-sm text-[#F4EFEA]/60">
                Outstation Rentals
              </span>

              <span className="text-sm text-[#F4EFEA]/60">
                Long-Term Rental
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-5 text-white">Contact</h3>

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#F4EFEA]/35 mb-1">
                  Location
                </p>

                <p className="text-sm text-[#F4EFEA]/65">Bhubaneswar, Odisha</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#F4EFEA]/35 mb-1">
                  Phone
                </p>

                <p className="text-sm text-[#F4EFEA]/65">+91 XXXXX XXXXX</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#F4EFEA]/35 mb-1">
                  Email
                </p>

                <p className="text-sm text-[#F4EFEA]/65">
                  hello@odishadrive.com
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#F4EFEA]/35 mb-1">
                  Support
                </p>

                <p className="text-sm text-[#D96B43]">
                  24/7 Roadside Assistance
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F4EFEA]/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#F4EFEA]/40 mb-3">
                Secure Payments
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-[#1E3A2B] border border-[#F4EFEA]/10 rounded-md text-xs text-[#F4EFEA]/70">
                  UPI
                </span>

                <span className="px-4 py-2 bg-[#1E3A2B] border border-[#F4EFEA]/10 rounded-md text-xs text-[#F4EFEA]/70">
                  VISA
                </span>

                <span className="px-4 py-2 bg-[#1E3A2B] border border-[#F4EFEA]/10 rounded-md text-xs text-[#F4EFEA]/70">
                  Mastercard
                </span>

                <span className="px-4 py-2 bg-[#1E3A2B] border border-[#F4EFEA]/10 rounded-md text-xs text-[#F4EFEA]/70">
                  Net Banking
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 text-sm">
              <NavLink
                to="/privacy"
                className="text-[#F4EFEA]/45 hover:text-[#D96B43] transition"
              >
                Privacy
              </NavLink>

              <NavLink
                to="/terms"
                className="text-[#F4EFEA]/45 hover:text-[#D96B43] transition"
              >
                Terms
              </NavLink>

              <NavLink
                to="/cancellation"
                className="text-[#F4EFEA]/45 hover:text-[#D96B43] transition"
              >
                Cancellation
              </NavLink>
            </div>
          </div>
        </div>

        <div className="mt-7 pt-6 border-t border-[#F4EFEA]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#F4EFEA]/35">
            © 2026 OdishaDrive. All rights reserved.
          </p>

          <p className="text-xs text-[#F4EFEA]/35">Drive. Discover. Odisha.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
