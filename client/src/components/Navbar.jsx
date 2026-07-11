import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isHome = location.pathname === "/";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .fd-nav { font-family: 'Inter', system-ui, sans-serif; }
        .fd-nav-display { font-family: 'Fraunces', serif; font-feature-settings: 'ss01' on; }
      `}</style>

      <header className="fd-nav sticky top-0 z-50 pt-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-between gap-4 h-[4.5rem] px-4 sm:px-6 rounded-2xl border border-[#E4E4F5] bg-white/75 backdrop-blur-xl shadow-[0_1px_2px_rgba(20,21,43,0.04),0_20px_40px_-24px_rgba(91,94,240,0.25)] transition-shadow duration-300">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/")}
              className="group flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="relative">
                <div className="fd-nav-display w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] flex items-center justify-center text-white text-lg sm:text-xl font-medium shadow-[0_8px_18px_-6px_rgba(74,77,219,0.55)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                  F
                </div>
                {isHome && (
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#0F9E93] border-2 border-white" />
                )}
              </div>

              <div className="hidden xs:block sm:block">
                <h1 className="fd-nav-display text-lg sm:text-xl font-medium text-[#14152B] leading-tight tracking-tight">
                  FlowDesk
                </h1>

                <p className="text-[11px] sm:text-xs text-[#8B8CA8] leading-tight">
                  Project Management
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden md:block text-right pr-4 border-r border-[#ECEDF6]">
                <p className="font-semibold text-[#14152B] text-sm leading-tight">
                  {user?.fullName}
                </p>

                <p className="text-xs text-[#8B8CA8] leading-tight mt-0.5">
                  {user?.email}
                </p>
              </div>

              <div className="fd-nav-display w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#6B6EF5] to-[#3730A3] flex items-center justify-center text-white font-medium shadow-[0_8px_18px_-6px_rgba(74,77,219,0.45)] shrink-0">
                {user?.fullName?.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl border border-[#E4E4F5] text-[#6B6C87] font-medium text-sm shadow-sm transition-all duration-200 hover:bg-[#EEF0FE] hover:text-[#4A4DDB] hover:border-[#D3D6FB] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A4DDB]/40"
              >
                <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
