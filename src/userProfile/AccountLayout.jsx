// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./sidebar";

// // Replace this with your existing navbar component if you have one.
// const AccountLayout = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#F4EFEA]">
//       <div className="flex items-start">
//         <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

//         <main className="min-w-0 flex-1 p-3 sm:p-5 lg:p-7">
//           <button
//             type="button"
//             onClick={() => setMobileOpen(true)}
//             className="mb-4 rounded-lg bg-[#1E3A2B] px-4 py-2 text-sm font-semibold text-white lg:hidden"
//           >
//             Open Menu
//           </button>

//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AccountLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Layout/header.jsx";
import Footer from "../Layout/footer.jsx";
import Sidebar from "./sidebar";

const AccountLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F1EB]">
      {/* Main website navbar */}
      <Header />

      {/* Sidebar + Dashboard */}
      <div className="flex min-h-[calc(100vh-76px)] items-start">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="min-w-0 flex-1 p-3 sm:p-5 lg:p-7">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-controls="account-sidebar"
            aria-expanded={mobileOpen}
            className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[#1E3A2B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#28543D] lg:hidden"
          >
            ☰ Open Menu
          </button>

          {/* Child pages */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AccountLayout;
