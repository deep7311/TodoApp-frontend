import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-600">
        <Link to="/">TODO</Link>
      </h1>

      <div>
        <Link
          to="/login"
          className="text-indigo-600 font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
