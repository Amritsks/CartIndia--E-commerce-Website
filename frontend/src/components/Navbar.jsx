import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 w-full bg-gradient-to-r from-zinc-100 to-red-100 p-2.5 rounded-sm z-50">
      <nav className="flex justify-between items-center flex-wrap max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex justify-start flex-shrink-0">
          <Link to="/">
            <div className="font-bold text-2xl cursor-pointer">CartꞮndia</div>
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="block md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:items-center md:w-auto ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-lg md:flex md:gap-5">
            <Link
              to="/"
              className="block px-3 py-2 font-semibold hover:text-red-600 md:inline"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {/* <Link to="/product" className="block px-3 py-2 hover:text-red-600 md:inline">Product</Link> */}
            <Link
              to="/contact"
              className="block px-3 py-2 font-semibold hover:text-red-600 md:inline"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/seller"
              className="block px-3 py-2 font-semibold hover:text-red-600 md:inline"
              onClick={() => setMenuOpen(false)}
            >
              Seller
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 font-semibold hover:text-red-600 md:inline"
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 font-semibold hover:text-red-600 md:inline"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/orders"
              className="block px-3 py-2 font-semibold hover:text-red-600 md:inline"
              onClick={() => setMenuOpen(false)}
            >
              My Orders
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
