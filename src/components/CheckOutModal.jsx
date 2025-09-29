// src/components/CheckoutModal.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Logo from "../assets/logo.svg";
import MonifyLogo from "../assets/Payments/monnify_logo.svg";
import LoanWalletLogo from "../assets/Payments/loan.svg";
import WalletLogo from "../assets/Payments/Wallet.svg";
import PaystackLogo from "../assets/Payments/paystack.svg";
import AuthCarousel from "./AuthCarousel";

export default function CheckoutModal({
  isOpen,
  onClose,
  onComplete,
  mode = "full",
  savedAddress,
}) {
  const [step, setStep] = useState(mode === "payment" ? 2 : 1);
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    saveDefault: false,
    paymentMethod: "Monify",
  });

  useEffect(() => {
    if (mode === "payment" && savedAddress) {
      setFormData((prev) => ({ ...prev, ...savedAddress }));
    }
  }, [mode, savedAddress]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete(formData);
      onClose();
    }
  };

  const paymentMethods = [
    { name: "Monify", logo: MonifyLogo },
    { name: "Loan Wallet", logo: LoanWalletLogo },
    { name: "Wallet", logo: WalletLogo },
    { name: "Paystack", logo: PaystackLogo },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      {/* Modal container */}
      <div className="bg-white/95 w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex animate-fadeIn min-h-[700px] max-h-[800px]">
        
        {/* Left Carousel */}
        <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center min-h-[700px]">
          <AuthCarousel fullWidth={true} />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-10 relative flex flex-col text-center overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-navy transition"
          >
            <X size={24} />
          </button>

          <img
            src={Logo}
            alt="logo"
            className="w-[200px] h-[60px] pb-4 object-contain mx-auto"
          />

          {/* Step 1: Address */}
          {step === 1 && (
            <div className="w-full animate-slideIn">
              <h2 className="text-2xl font-bold mb-6 text-custom-black">
                Add Shipping Address
              </h2>
              <div className="space-y-5 text-left">
                {/* Form fields */}
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-navy outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-navy outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-navy outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-navy outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Address</label>
                  <textarea
                    placeholder="Enter delivery address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 h-20 resize-none focus:ring-2 focus:ring-navy outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      placeholder="Enter state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-navy outline-none"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-navy outline-none"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="saveDefault"
                    checked={formData.saveDefault}
                    onChange={handleChange}
                    className="rounded-full"
                  />
                  <span className="text-sm text-gray-700">Save as default address</span>
                </label>
              </div>

              <button
                onClick={handleNext}
                className="mt-8 w-full bg-navy text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition"
              >
                Save
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
{step === 2 && (
  <div className="w-full animate-slideIn">
    <h2 className="text-2xl font-bold mb-6 text-custom-black text-center">
      Choose Payment Method
    </h2>

    <div className="space-y-4 flex flex-col items-center">
      {paymentMethods.map((method) => (
        <div key={method.name} className="flex items-center w-3/4">
          <input
            type="radio"
            name="paymentMethod"
            value={method.name}
            checked={formData.paymentMethod === method.name}
            onChange={handleChange}
            className="w-5 h-5 mr-3 text-navy focus:ring-navy"
          />
          <label
            className={`flex items-center justify-center border rounded-xl px-6 py-5 flex-1 cursor-pointer transition hover:shadow-md ${
              formData.paymentMethod === method.name
                ? "border-navy bg-navy/5"
                : "border-gray-200"
            }`}
          >
            <img
              src={method.logo}
              alt={method.name}
              className="h-[28px] object-contain"
            />
          </label>
        </div>
      ))}
    </div>

    <div className="mt-8">
      <button
        onClick={handleNext}
        className="w-full bg-navy text-white font-semibold py-3 rounded-xl shadow hover:opacity-90 transition"
      >
        Make Payment
      </button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
