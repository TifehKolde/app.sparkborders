// src/components/AddMoneyModal.jsx
import { useState } from "react";
import { X } from "lucide-react";
import Logo from "../../assets/logo.svg";

export default function AddMoneyModal({ isOpen, onClose, onComplete }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ Frontend: Send request to backend endpoint
      // Example:
      // const response = await fetch("/api/initiate-add-money", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ amount }),
      // });
      // const data = await response.json();

      // Simulate success
      setTimeout(() => {
        setLoading(false);
        onComplete({ amount });
        onClose();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to process request");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white/95 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex animate-fadeIn min-h-[400px]">
        
        {/* Left Branding */}
        <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
          <img src={Logo} alt="Brand Logo" className="w-[180px] h-auto object-contain" />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-8 relative flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-navy transition"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-custom-black text-center mb-4">
            Add Money to Wallet
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter the amount you want to add
          </p>

          {/* Amount Input */}
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full border border-gray-300 rounded-lg p-3 text-custom-black focus:ring-2 focus:ring-navy outline-none mb-4"
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleAddMoney}
            disabled={loading}
            className={`w-full bg-navy text-white py-3 rounded-lg font-semibold hover:opacity-90 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Add Money"}
          </button>
        </div>
      </div>
    </div>
  );
}
