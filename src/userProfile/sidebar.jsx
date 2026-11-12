// import {
//   LayoutDashboard,
//   CalendarDays,
//   Compass,
//   CarFront,
//   CreditCard,
//   Heart,
//   UserRound,
//   Settings,
//   LogOut,
//   X,
//   MapPinned,
//   ArrowRight,
// } from "lucide-react";

// import { NavLink, useNavigate } from "react-router-dom";

// const menuItems = [
//   {
//     name: "Dashboard",
//     path: "/account/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "My Bookings",
//     path: "/account/bookings",
//     icon: CalendarDays,
//   },
//   {
//     name: "Explore Odisha",
//     path: "/account/explore",
//     icon: Compass,
//   },
//   {
//     name: "Our Fleet",
//     path: "/account/fleet",
//     icon: CarFront,
//   },
//   {
//     name: "Payments",
//     path: "/account/payments",
//     icon: CreditCard,
//   },
//   {
//     name: "Wishlist",
//     path: "/account/wishlist",
//     icon: Heart,
//   },
//   {
//     name: "Profile",
//     path: "/account/profile",
//     icon: UserRound,
//   },
//   {
//     name: "Settings",
//     path: "/account/settings",
//     icon: Settings,
//   },
// ];

// const AccountSidebar = ({ mobileOpen = false, onClose = () => {} }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     onClose();
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       <div
//         onClick={onClose}
//         aria-hidden="true"
//         className={`fixed inset-0 z-40 bg-[#14271D]/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
//           mobileOpen ? "visible opacity-100" : "invisible opacity-0"
//         }`}
//       />

//       {/* Sidebar */}
//       <aside
//         id="account-sidebar"
//         aria-label="Account navigation"
//         className={`
//           fixed inset-y-0 left-0 z-50
//           flex h-dvh w-[min(280px,85vw)] flex-col
//           border-r border-[#E8E0D8] bg-white
//           shadow-xl transition-transform duration-300 ease-in-out
//           lg:sticky lg:top-[72px] lg:z-10
//           lg:h-[calc(100dvh-72px)] lg:w-[260px]
//           lg:shrink-0 lg:translate-x-0 lg:shadow-none
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         {/* Mobile header */}
//         <div className="flex items-center justify-between border-b border-[#EEE8E1] px-5 py-4 lg:hidden">
//           <div className="flex items-center gap-2">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E3A2B] text-white">
//               <CarFront size={21} />
//             </div>

//             <span className="font-bold text-[#1E3A2B]">My Account</span>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close account menu"
//             className="rounded-xl p-2 text-gray-500 transition hover:bg-[#F5F0E9] hover:text-[#1E3A2B]"
//           >
//             <X size={21} />
//           </button>
//         </div>

//         {/* User profile card */}
//         <div className="border-b border-[#EEE8E1] p-5">
//           <div className="rounded-2xl border border-[#E9E1D9] bg-[#FAF7F2] p-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1E3A2B] text-lg font-bold text-white shadow-sm">
//                 U
//               </div>

//               <div className="min-w-0 flex-1">
//                 <h3 className="truncate text-sm font-bold text-[#1E3A2B]">
//                   My Account
//                 </h3>

//                 <p className="mt-1 truncate text-xs text-gray-500">
//                   Welcome to OdishaDrive
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 flex items-center justify-between border-t border-[#E8E0D8] pt-3">
//               <span className="text-xs text-gray-500">Account type</span>

//               <span className="rounded-full bg-[#E6F1E8] px-2.5 py-1 text-[10px] font-bold text-[#286343]">
//                 CUSTOMER
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Navigation menu */}
//         <div className="flex-1 overflow-y-auto px-4 py-5">
//           <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
//             Main Menu
//           </p>

//           <nav className="space-y-1.5">
//             {menuItems.map(({ name, path, icon: Icon }) => (
//               <NavLink
//                 key={path}
//                 to={path}
//                 end={path === "/account/dashboard"}
//                 onClick={onClose}
//                 className={({ isActive }) =>
//                   `group relative flex min-h-12 items-center gap-3.5 rounded-xl border px-3.5 py-3 text-sm transition-all duration-200 ${
//                     isActive
//                       ? "border-[#F4D9CC] bg-[#FCEDE5] font-semibold text-[#C95731] shadow-sm"
//                       : "border-transparent text-[#5D665F] hover:border-[#EEE8E1] hover:bg-[#FAF7F2] hover:text-[#1E3A2B]"
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     <span
//                       className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
//                         isActive
//                           ? "bg-[#D96B43] text-white"
//                           : "bg-transparent text-gray-500 group-hover:bg-white group-hover:text-[#1E3A2B]"
//                       }`}
//                     >
//                       <Icon size={19} strokeWidth={2} />
//                     </span>

//                     <span className="flex-1">{name}</span>

//                     {isActive && (
//                       <ArrowRight size={16} className="text-[#D96B43]" />
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Explore promo */}
//           <div className="relative mt-7 overflow-hidden rounded-2xl bg-[#1E3A2B] p-4 text-white">
//             <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border-[15px] border-white/[0.06]" />

//             <div className="relative">
//               <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#D96B43]">
//                 <MapPinned size={20} />
//               </div>

//               <h3 className="text-sm font-bold">Explore Odisha</h3>

//               <p className="mt-2 text-xs leading-5 text-white/65">
//                 Discover beaches, temples and beautiful destinations.
//               </p>

//               <NavLink
//                 to="/account/explore"
//                 onClick={onClose}
//                 className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#F49A76] transition hover:text-white"
//               >
//                 Explore now
//                 <ArrowRight size={15} />
//               </NavLink>
//             </div>
//           </div>
//         </div>

//         {/* Logout section */}
//         <div className="border-t border-[#EEE8E1] bg-white p-4">
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
//           >
//             <LogOut size={19} />
//             Logout
//           </button>

//           <p className="mt-3 text-center text-[10px] text-gray-400">
//             OdishaDrive · Explore Odisha
//           </p>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AccountSidebar;

import {
  LayoutDashboard,
  CalendarDays,
  Compass,
  CarFront,
  CreditCard,
  Heart,
  UserRound,
  Settings,
  LogOut,
  X,
  MapPinned,
  ArrowRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/account/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Bookings",
    path: "/account/bookings",
    icon: CalendarDays,
  },
  {
    name: "Explore Odisha",
    path: "/account/explore",
    icon: Compass,
  },
  {
    name: "Our Fleet",
    path: "/account/fleet",
    icon: CarFront,
  },
  {
    name: "Payments",
    path: "/account/payments",
    icon: CreditCard,
  },
  {
    name: "Wishlist",
    path: "/account/wishlist",
    icon: Heart,
  },
  {
    name: "Profile",
    path: "/account/profile",
    icon: UserRound,
  },
  {
    name: "Settings",
    path: "/account/settings",
    icon: Settings,
  },
];

const AccountSidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // onClose();
    // navigate("/login");

    const data = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      credentials: "include",
    });
    console.log(data);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        id="account-sidebar"
        aria-label="Account navigation"
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-[min(280px,85vw)] flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-200 ease-in-out
          lg:sticky lg:top-[76px] lg:z-10
          lg:h-[calc(100dvh-76px)] lg:w-[260px]
          lg:shrink-0 lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <CarFront size={21} className="text-black" />

            <span className="text-sm font-medium text-black">My Account</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close account menu"
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
          >
            <X size={21} />
          </button>
        </div>

        {/* User information */}
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-black">
              U
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium text-black">
                My Account
              </h3>

              <p className="mt-1 truncate text-xs font-normal text-gray-500">
                Welcome to OdishaDrive
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
            <span className="text-xs text-gray-500">Account type</span>

            <span className="rounded-md border border-gray-300 px-2.5 py-1 text-[10px] font-normal text-gray-700">
              CUSTOMER
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/account/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex min-h-11 items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "border-gray-300 bg-gray-100 font-medium text-black"
                      : "border-transparent font-normal text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={1.7}
                      className={
                        isActive
                          ? "shrink-0 text-black"
                          : "shrink-0 text-gray-500 group-hover:text-black"
                      }
                    />

                    <span className="flex-1">{name}</span>

                    {isActive && (
                      <ArrowRight size={15} className="text-black" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Explore card */}
          <div className="mt-7 rounded-lg border border-gray-200 bg-white p-4">
            <MapPinned
              size={22}
              strokeWidth={1.6}
              className="mb-3 text-black"
            />

            <h3 className="text-sm font-medium text-black">Explore Odisha</h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Discover beaches, temples and beautiful destinations.
            </p>

            <NavLink
              to="/account/explore"
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-black hover:underline"
            >
              Explore now
              <ArrowRight size={15} />
            </NavLink>
          </div>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 bg-white p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal text-black transition hover:bg-gray-100"
          >
            <LogOut size={19} strokeWidth={1.7} />
            Logout
          </button>

          <p className="mt-3 text-center text-[10px] text-gray-400">
            OdishaDrive · Explore Odisha
          </p>
        </div>
      </aside>
    </>
  );
};

export default AccountSidebar;
