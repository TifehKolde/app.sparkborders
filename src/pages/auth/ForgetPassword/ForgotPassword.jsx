import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import api from "../../../api/authApi"; // Axios instance
import { toast } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Slide1 from "../../../assets/leftslider/img1.webp";
import Slide2 from "../../../assets/leftslider/img2.webp";
import Slide3 from "../../../assets/leftslider/img3.webp";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return toast.error("Please enter your email");

    try {
      setLoading(true);

      const res = await api.post("/v1/user/auth/forgotPassword", { email });

      toast.success(res.data.message || "Reset link sent!");
      
      // ✅ Navigate to check email screen
      navigate("/checkemail", { state: { email } });

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
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
          <div className="flex justify-center mb-4">
            <Mail className="w-14 h-14 text-navy" />
          </div>

          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 mb-6 font-inter">
            Enter your email to receive a password reset link.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-navy font-inter"
          />

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full py-3 bg-navy text-white rounded-xl transition font-inter ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary hover:text-navy"
            }`}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="mt-3 text-navy font-semibold hover:underline font-inter"
          >
            Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
