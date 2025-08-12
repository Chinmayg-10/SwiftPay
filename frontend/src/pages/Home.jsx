import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-white">
      <div className="flex flex-col justify-center px-8 md:px-20 lg:px-32 w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight">
          Fast, Secure & Easy <br /> Money Transfers
        </h1>
        <p className="text-blue-700 text-lg md:text-xl max-w-xl">
          Send and receive money instantly, with top-level security and a smooth experience.
          Join us today and make your transfers effortless.
        </p>
        <Link
          to="/signup"
          className="inline-block px-8 py-4 bg-blue-700 text-white rounded-xl shadow-lg hover:bg-blue-800 transition duration-300 font-semibold"
        >
          Get Started
        </Link>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-50">
        <img
          src="https://global-uploads.webflow.com/61932e147a6e406b3e9dce94/61b1af1b09ecf09b8f79d8c1_best-international-money-transfer-1024x628.jpeg"
          alt="Money Transfer"
          className="w-4/5 max-w-lg rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  );
}


