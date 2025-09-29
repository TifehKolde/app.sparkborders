import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/authApi";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Slide1 from "../../../assets/leftslider/img1.webp";
import Slide2 from "../../../assets/leftslider/img2.webp";
import Slide3 from "../../../assets/leftslider/img3.webp";

export default function SetNewPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post(`/v1/user/auth/resetPassword/${token}`, {
        password,
      });

      toast.success(res.data.message || "Password reset successfully!");
      navigate("/password-reset-success");
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to reset password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };


    const carouselImages = [Slide1, Slide2, Slide3];
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
      <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          className="w-[500px] h-[700px] relative"
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full rounded"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">
            Set New Password
          </h2>
          <p className="text-gray-600 mb-6 font-inter">
            Enter your new password below.
          </p>

          {/* Password Input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-navy pr-10 font-inter"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-navy pr-10 font-inter"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit Button with Spinner */}
          <button
            onClick={handleResetPassword}
            disabled={isLoading}
            className={`w-full py-3 bg-navy text-white rounded-xl transition font-inter mb-3 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary hover:text-navy"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-navy font-semibold hover:underline font-inter"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
