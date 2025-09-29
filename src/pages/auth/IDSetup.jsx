// src/pages/auth/IDSetup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthCarousel from "../../components/AuthCarousel";
import "swiper/css";
import "swiper/css/pagination";

import Logo from "../../assets/logo.svg";
import { uploadFiles } from "../../api/uploadClient"; // handles multiple files
import { completeOnboarding } from "../../api/authClient";
import { toast } from "react-toastify";

export default function IDSetup() {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const pendingEmail = localStorage.getItem("pendingEmail");
  const accountData = JSON.parse(localStorage.getItem("accountData") || "{}");
  

  const handleFileChange = (e, setImage, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg+xml", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, JPEG, SVG, or GIF files are allowed.");
      return;
    }

    setImage(file);
    setErrors((prev) => ({ ...prev, [field]: "" })); // clear error for this field
  };

  const validateForm = () => {
    const newErrors = {};
    if (!idType) newErrors.idType = "Select ID type";
    if (!idNumber.trim()) newErrors.idNumber = "Enter your ID number";
    if (!frontImage) newErrors.frontImage = "Upload front image";
    if (!backImage) newErrors.backImage = "Upload back image";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Upload both images
      const uploadRes = await uploadFiles([frontImage, backImage]);

      // Ensure data is always an array
      const uploadedData = Array.isArray(uploadRes.data) ? uploadRes.data : [];

      if (!uploadRes.success || uploadedData.length < 2) {
        toast.error(uploadRes.message || "File upload failed");
        setLoading(false);
        return;
      }

      const [frontUrl, backUrl] = uploadedData;

      // Complete onboarding
      const res = await completeOnboarding({
        email: pendingEmail,
        userType: accountData.accountType,
        country: accountData.country,
        state: accountData.state,
        address: accountData.address,
        intrestedProduct: accountData.products,
        idType,
        idImageFront: frontUrl,
        idImageBack: backUrl,
      });
      

      setLoading(false);

      if (res.success) {
        toast.success("Onboarding complete!");
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("accountData"); // ✅ clear temp data
        navigate("/dashboard");
      }
       else {
        toast.error(res.message || "Failed to complete onboarding");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side Carousel */}
      <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
        <AuthCarousel />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12 py-8 md:py-0">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="h-10 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-headings font-bold text-gray-900 pt-6">
              Set up means of identification
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ID Type */}
            <div>
              <label className="block text-sm md:text-base font-medium text-custom-black mb-1">
                Means of identification*
              </label>
              <select
                value={idType}
                onChange={(e) => {
                  setIdType(e.target.value);
                  setErrors((prev) => ({ ...prev, idType: "" }));
                }}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-navy font-inter"
              >
                <option value="">Select ID type</option>
                <option value="passport">Passport</option>
                <option value="drivers-license">Driver's License</option>
                <option value="national-id">National ID</option>
              </select>
              {errors.idType && <p className="text-red-500 text-xs mt-1">{errors.idType}</p>}
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm md:text-base font-medium text-custom-black mb-1">
                ID card number*
              </label>
              <input
                type="text"
                placeholder="Enter your ID number"
                value={idNumber}
                onChange={(e) => {
                  setIdNumber(e.target.value);
                  setErrors((prev) => ({ ...prev, idNumber: "" }));
                }}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-navy font-inter"
              />
              {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
            </div>

            {/* Front + Back Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Front */}
              <div>
                <label className="block text-sm md:text-base font-medium text-custom-black mb-2">
                  Upload Front of ID*
                </label>
                <div className="relative w-full min-h-[160px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-navy/60 transition">
                  {frontImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(frontImage)}
                        alt="Front of ID"
                        className="h-full w-full object-contain p-2 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setFrontImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="h-10 w-10 text-navy mb-2" />
                      <p className="text-gray-600 font-inter">Click to upload front side</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG, GIF</p>
                    </>
                  )}
                  {errors.frontImage && <p className="text-red-500 text-xs mt-1">{errors.frontImage}</p>}
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.gif"
                    onChange={(e) => handleFileChange(e, setFrontImage, "frontImage")}
                    className="absolute w-full h-full opacity-0 cursor-pointer top-0 left-0"
                  />
                </div>
              </div>

              {/* Back */}
              <div>
                <label className="block text-sm md:text-base font-medium text-custom-black mb-2">
                  Upload Back of ID*
                </label>
                <div className="relative w-full min-h-[160px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center hover:border-navy/60 transition">
                  {backImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(backImage)}
                        alt="Back of ID"
                        className="h-full w-full object-contain p-2 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setBackImage(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="h-10 w-10 text-navy mb-2" />
                      <p className="text-gray-600 font-inter">Click to upload back side</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG, GIF</p>
                    </>
                  )}
                  {errors.backImage && <p className="text-red-500 text-xs mt-1">{errors.backImage}</p>}
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.gif"
                    onChange={(e) => handleFileChange(e, setBackImage, "backImage")}
                    className="absolute w-full h-full opacity-0 cursor-pointer top-0 left-0"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-3 bg-navy text-white rounded-xl hover:bg-primary hover:text-navy transition font-inter ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Continue"}
            </button>
          </form>

          <p className="mt-6 text-center font-inter text-sm text-custom-black">
            <Link to="/accountsetup" className="text-navy hover:underline">
              Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
