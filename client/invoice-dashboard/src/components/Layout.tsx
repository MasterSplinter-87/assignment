import { useDispatch } from "react-redux";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaCog, FaMoon, FaBars } from "react-icons/fa";
import { useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useSearch } from "../hooks/useSearch";
import { logout } from "../features/auth/authSlice";

const menu = ["home", "invoices", "bills", "expenses", "reports"];

export default function Layout() {
  const location = useLocation();
  const auth = useAuth();
  const { search, setSearch } = useSearch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  const crumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    return parts.length === 0 ? ["home"] : parts;
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-screen">
      {/* Sidebar - only if logged in */}
      {auth.token && (
        <aside
          className={`transition-all duration-300 ${
            auth.token ? "w-[300px] p-4" : "w-0 p-0"
          } bg-gradient-to-b from-indigo-100 to-white shadow-sm overflow-hidden`}
        >
          {auth.token && (
            <>
              <div className="text-2xl font-bold mb-8 text-blue-600">LOGO</div>
              <nav className="text-gray-700 space-y-2">
                <div className="font-semibold text-sm text-gray-500 mb-2">
                  Menu
                </div>
                <ul className="space-y-2">
                  {menu.map((item) => (
                    <li key={item}>
                      <NavLink
                        to={item === "home" ? "/" : `/${item}`}
                        className={({ isActive }) =>
                          `block px-2 py-1 rounded capitalize ${
                            isActive
                              ? "bg-indigo-200 font-semibold"
                              : "hover:bg-indigo-100"
                          }`
                        }
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="mt-8 w-full text-center px-2 py-1 rounded text-white-600 hover:bg-red-100 font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </aside>
      )}

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-50">
        {/* Header */}
        {auth.token && (
          <div className="flex flex-1 items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaBars />
              {crumbs.length === 1 && crumbs[0] === "home" ? (
                <span className="capitalize text-indigo-600 font-semibold">
                  Home
                </span>
              ) : (
                <>
                  <span className="capitalize text-gray-600">Home</span>
                  {crumbs.map((crumb, index) => (
                    <span key={index} className="capitalize text-gray-600">
                      <span className="mx-1">/ </span>
                      {index === crumbs.length - 1 ? (
                        <span className="text-indigo-600 font-semibold">
                          {crumb}
                        </span>
                      ) : (
                        crumb
                      )}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-1 border rounded-md text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaBell className="cursor-pointer" />
              <FaCog className="cursor-pointer" />
              <FaMoon className="cursor-pointer" />
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-8 h-8 rounded-full object-cover"
                alt="User"
              />
            </div>
          </div>
        )}

        {/* Page content */}
        <Outlet />
      </main>
    </div>
  );
}
