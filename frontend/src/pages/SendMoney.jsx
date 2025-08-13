import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleTransfer = async () => {
    if (!amount || amount <= 0) return;

    setLoading(true);
    try {
      await axios.post(
        `${backendUrl}/api/v1/account/transfer`,
        { amount, to: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert(`✅ Transfer of ₹${amount} to ${name} successful!`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-transform transform hover:scale-[1.01] duration-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Send Money
        </h2>
        <div className="flex items-center mb-6">
          <div className="rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 h-14 w-14 flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-semibold">
              {name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">Recipient</p>
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Amount (in ₹)
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <button
          onClick={handleTransfer}
          disabled={loading}
          className={`w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
            loading
              ? "opacity-80 cursor-not-allowed"
              : "hover:shadow-xl hover:scale-[1.02]"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Initiate Transfer"
          )}
        </button>
      </div>
    </div>
  );
};
