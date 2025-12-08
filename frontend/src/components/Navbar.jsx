import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="fixed left-0 top-0 w-full bg-gradient-to-r from-zinc-100 to-red-100 p-2.5 rounded-sm z-50 shadow">
      <nav className="flex justify-between items-center flex-wrap max-w-7xl mx-auto px-4">

        {/* Logo */}
        <div className="flex justify-start flex-shrink-0">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <div className="font-bold text-2xl cursor-pointer">CartꞮndia</div>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="block md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>

        {/* Links */}
        <div className={`w-full md:flex md:items-center md:w-auto ${menuOpen ? "block" : "hidden"}`}>
          <div className="text-lg md:flex md:gap-5">

            <Link to="/" className="block px-3 py-2 font-semibold hover:text-red-600"
              onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/contact" className="block px-3 py-2 font-semibold hover:text-red-600"
              onClick={() => setMenuOpen(false)}>
              Contact
            </Link>

            {/* Logged-in user options */}
            {user && (
              <>
                <Link to="/seller" className="block px-3 py-2 font-semibold hover:text-red-600"
                  onClick={() => setMenuOpen(false)}>
                  Seller
                </Link>

                <Link to="/cart" className="block px-3 py-2 font-semibold hover:text-red-600"
                  onClick={() => setMenuOpen(false)}>
                  Cart
                </Link>

                <Link to="/orders" className="block px-3 py-2 font-semibold hover:text-red-600"
                  onClick={() => setMenuOpen(false)}>
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 font-semibold text-red-600 hover:text-red-800 md:inline"
                >
                  Logout
                </button>
              </>
            )}

            {/* Logged-out user options */}
            {!user && (
              <>
                <Link to="/login" className="block px-3 py-2 font-semibold hover:text-red-600"
                  onClick={() => setMenuOpen(false)}>
                  Login
                </Link>

                <Link to="/signup" className="block px-3 py-2 font-semibold hover:text-red-600"
                  onClick={() => setMenuOpen(false)}>
                  Signup
                </Link>
              </>
            )}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
