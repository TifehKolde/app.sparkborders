// src/components/AddAccountModal.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Logo from "../../assets/logo.svg";

export default function AddAccountModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountName: "",
  });
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [resolving, setResolving] = useState(false);

  // ✅ Fetch bank list when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchBanks = async () => {
        try {
          setLoadingBanks(true);
          const response = await fetch("https://api.paystack.co/bank?country=nigeria", {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`, // ✅ from .env
            },
          });
          const data = await response.json();
          if (data.status) {
            setBanks(data.data);
          }
        } catch (err) {
          console.error("Error fetching banks:", err);
        } finally {
          setLoadingBanks(false);
        }
      };

      fetchBanks();
    }
  }, [isOpen]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Auto resolve account name
  useEffect(() => {
    const resolveAccount = async () => {
      if (formData.bank && formData.accountNumber.length === 10) {
        try {
          setResolving(true);
          const response = await fetch(
            `https://api.paystack.co/bank/resolve?account_number=${formData.accountNumber}&bank_code=${formData.bank}`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
              },
            }
          );
          const data = await response.json();
          if (data.status) {
            setFormData((prev) => ({ ...prev, accountName: data.data.account_name }));
          }
        } catch (err) {
          console.error("Error resolving account:", err);
        } finally {
          setResolving(false);
        }
      }
    };

    resolveAccount();
  }, [formData.bank, formData.accountNumber]);

  const handleSave = () => {
    if (formData.bank && formData.accountNumber && formData.accountName) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white/95 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex animate-fadeIn min-h-[500px]">
        
        {/* Left branding */}
        <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
          <img src={Logo} alt="Brand Logo" className="w-[180px] h-auto object-contain" />
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 p-10 relative flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-navy transition"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-custom-black text-center mb-2">
            Add Bank Account
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter your bank details to save a withdrawal account
          </p>

          {/* Form as Card */}
          <div className="bg-[#E6E6F3] border border-gray-200 rounded-2xl shadow px-6 py-10 space-y-5 flex-1">
            {/* Bank */}
            <div>
              <label className="block text-lg font-medium text-navy mb-3">Bank Name</label>
              <select
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-custom-black focus:ring-2 focus:ring-navy outline-none bg-white"
              >
                <option value="">Select Bank</option>
                {loadingBanks ? (
                  <option>Loading banks...</option>
                ) : (
                  banks.map((bank) => (
                    <option key={bank.id} value={bank.code}>
                      {bank.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-lg font-medium text-navy mb-3">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter account number"
                value={formData.accountNumber}
                onChange={handleChange}
                maxLength={10}
                className="w-full border border-gray-300 rounded-lg p-3 text-custom-black focus:ring-2 focus:ring-navy outline-none bg-white"
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-lg font-medium text-navy mb-3">Account Name</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                readOnly
                placeholder={resolving ? "Resolving..." : "Account name will appear here"}
                className="w-full border border-gray-300 rounded-lg p-3 text-custom-black focus:ring-2 focus:ring-navy outline-none bg-gray-100"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!formData.bank || !formData.accountNumber || !formData.accountName}
            className="mt-8 w-full bg-primary text-navy py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:text-white hover:opacity-90 transition"
          >
            Continue with this new account
          </button>
        </div>
      </div>
    </div>
  );
}
