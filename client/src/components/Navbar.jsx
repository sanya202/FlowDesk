import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            F
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              FlowDesk
            </h1>

            <p className="text-xs text-gray-500">
              Project Management
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <div className="hidden md:block text-right">
            <p className="font-semibold text-gray-900">
              {user?.fullName}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>

          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            <FiLogOut />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;