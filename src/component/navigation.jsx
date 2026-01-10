import { useNavigate, useLocation } from "react-router-dom";
import whiteLogo from "../assets/transparentIcon.png";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔍 Get current path
  //  Define navigation items

  const navItems = [
    { label: "Verify Driver", path: "/dashboard/verifydriver" },
    { label: "User", path: "/dashboard/user" },
    { label: "Driver", path: "/dashboard/driver" },
    { label: "Order", path: "/dashboard/allorders" },
    { label: "Journey", path: "/dashboard/alljourney" },
    { label: "Support", path: "/dashboard/support" },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-orange-500 text-white shadow-lg">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center h-24 border-b border-gray-700">
        <img src={whiteLogo} alt="logo" className="w-30 h-30 object-contain" />
        {/* <h4>Admin Panel</h4> */}
      </div>

      {/* Navigation Items */}
      {/* there is a */}
      <nav className="flex flex-col gap-4 p-6">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`text-left text-lg font-medium transition-transform hover:translate-x-1 px-3 py-1 rounded-md ${
                isActive
                  ? "bg-yellow-100 border border-yellow-400 text-yellow-800"
                  : "hover:text-yellow-400"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto p-6 border-t border-gray-700">
        <button
          onClick={() => navigate("/logout")}
          className="text-left text-lg font-semibold hover:text-red-400 transition-transform hover:translate-x-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navigation;
