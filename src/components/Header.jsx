import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg py-4 px-6 flex justify-between items-center rounded-b-2xl">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-wide">
        <Link to="/" className="hover:opacity-90 transition">
          📝 TODO
        </Link>
      </h1>

      {/* Navigation */}
      <nav>
        <Link
          to="/login"
          className="bg-white text-indigo-600 font-semibold px-4 py-1.5 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
