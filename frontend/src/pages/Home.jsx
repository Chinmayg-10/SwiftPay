// src/pages/Home.jsx
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white"
    >
      <h1 className="text-5xl font-bold mb-4 tracking-wide drop-shadow-lg">
        SwiftPay
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Fast, secure, and simple money transfers. Sign up today and start sending money in seconds.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-200"
        >
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="px-6 py-3 bg-transparent border border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-200"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};
