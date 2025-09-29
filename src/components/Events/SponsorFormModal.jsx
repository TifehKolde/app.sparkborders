import { X } from "lucide-react";
import Logo from "../../assets/logo.svg";
import { useState } from "react";

export default function SponsorFormModal({ isOpen, onClose, title }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // TODO: send form data to API here
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white/95 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex animate-fadeIn min-h-[500px] max-h-[700px]">
        
        {/* Left Branding */}
        <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
          <img src={Logo} alt="Brand Logo" className="w-[200px] h-auto object-contain" />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-10 relative overflow-y-auto">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-navy transition"
          >
            <X size={24} />
          </button>

          {/* Heading with Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={Logo} alt="Small Logo" className="h-10 object-contain mb-3" />
            <h2 className="text-2xl font-bold text-custom-black text-center">
              {title}
            </h2>
          </div>

          {/* Success Message */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg font-semibold text-navy mb-2">✅ Thank you!</p>
              <p className="text-gray-600 text-sm text-center">
                Your application has been received. We’ll contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  required
                  className="w-full  border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-navy"
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  required
                  className="w-full  border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-navy"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  required
                  className="w-full  border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-navy"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  required
                  className="w-full  border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-navy"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  placeholder="Enter address"
                  required
                  rows={3}
                  className="w-full  border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-navy"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-navy text-white py-3 rounded-xl shadow hover:opacity-90 transition font-semibold"
              >
                Send information
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
