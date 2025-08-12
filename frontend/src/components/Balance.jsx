import { useState, useEffect } from "react";
import axios from "axios";
import { Wallet } from "lucide-react";

export const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setBalance(res.data.balance);
      } catch (error) {
        console.error("Error fetching balance", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-5 flex items-center space-x-5 max-w-sm text-white">
      <div className="p-3 rounded-full bg-white/20">
        <Wallet size={30} className="text-white" />
      </div>

      <div>
        <div className="text-sm opacity-90 font-medium tracking-wide">
          Available Balance
        </div>
        {loading ? (
          <div className="h-6 w-28 bg-white/30 rounded animate-pulse mt-1"></div>
        ) : (
          <div className="text-2xl font-bold mt-1">
            ₹ {balance?.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

