import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import Logo from "../../assets/logo.svg";

import GTBankLogo from "../../assets/WaletBanks/sc.svg";
import AddAccountModal from "./AddAccountModal";

// Optional: mapping bank names to logos
const bankLogos = {
  "GTBank": GTBankLogo,
  "Access Bank": GTBankLogo, // Replace with AccessBankLogo
  "UBA": GTBankLogo,         // Replace with UBALogo
  "Zenith Bank": GTBankLogo, // Replace with ZenithLogo
};

export default function WithdrawModal({ isOpen, onClose, onComplete }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      bankName: "GTBank",
      acctNumber: "0123456789",
      acctName: "Boluwatife Elijah",
    },
    {
      id: 2,
      bankName: "Access Bank",
      acctNumber: "0987654321",
      acctName: "Royal Cliff Properties",
    },
  ]);

  const [showAddAccount, setShowAddAccount] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedAccount) return;
    onComplete(selectedAccount);
    onClose();
  };

  const handleSaveAccount = (newAccount) => {
    const formatted = {
      id: accounts.length + 1,
      bankName: newAccount.bank,
      acctNumber: newAccount.accountNumber,
      acctName: newAccount.accountName,
    };
    setAccounts((prev) => [...prev, formatted]);
    setShowAddAccount(false);
  };

  const handleDeleteAccount = (id) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
    if (selectedAccount?.id === id) setSelectedAccount(null);
  };

  return (
    <>
      {!showAddAccount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white/95 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex animate-fadeIn min-h-[600px] max-h-[700px]">
            
            {/* Left branding */}
            <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center min-h-[600px]">
              <img src={Logo} alt="Brand Logo" className="w-[200px] h-auto object-contain" />
            </div>

            {/* Right content */}
            <div className="w-full md:w-1/2 p-10 relative flex flex-col text-center overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-navy transition"
              >
                <X size={24} />
              </button>

              {/* Heading */}
              <div className="flex flex-col items-center justify-center mb-6">
                <img src={Logo} alt="Small Logo" className="h-10 object-contain mb-3" />
                <h2 className="text-2xl font-bold text-custom-black text-center">
                  Pick a Withdrawal Account
                </h2>
              </div>

              {accounts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-500 mb-6">No accounts added yet.</p>
                  <button
                    onClick={() => setShowAddAccount(true)}
                    className="bg-navy text-white py-3 px-6 rounded-lg shadow hover:opacity-90 transition"
                  >
                    + Add Bank Account
                  </button>
                </div>
              ) : (
                <>
                  {/* Accounts list */}
                  <div className="space-y-4">
                    {accounts.map((account) => (
                      <div
                        key={account.id}
                        className={`flex items-center justify-between border rounded-xl p-4 cursor-pointer transition hover:shadow-md ${
                          selectedAccount?.id === account.id
                            ? "border-navy bg-navy/5"
                            : "border-gray-200"
                        }`}
                      >
                        <div
                          className="text-left flex-1"
                          onClick={() => setSelectedAccount(account)}
                        >
                          <p className="font-semibold text-lg text-black">{account.acctNumber}</p>
                          <p className="text-sm text-black">{account.acctName}</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <img
                            src={bankLogos[account.bankName] || GTBankLogo}
                            alt={account.bankName}
                            className="h-[32px] object-contain mb-1"
                          />
                          <span className="text-xs text-black">{account.bankName}</span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="ml-3 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAccount}
                    className={`mt-8 w-full font-semibold py-3 rounded-xl shadow transition ${
                      selectedAccount
                        ? "bg-navy text-white hover:opacity-90"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>

                  <button
                    onClick={() => setShowAddAccount(true)}
                    className="mt-4 w-full bg-gray-100 text-navy py-3 rounded-xl shadow hover:bg-gray-200 transition"
                  >
                    + Add New Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      {showAddAccount && (
        <AddAccountModal
          isOpen={showAddAccount}
          onClose={() => setShowAddAccount(false)}
          onSave={handleSaveAccount}
        />
      )}
    </>
  );
}
