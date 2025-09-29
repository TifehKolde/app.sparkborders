import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-hot-toast";
import {useLogin} from "../../api/hooks/useLogin"

import Logo from "../../assets/logo.svg";
import Google from "../../assets/google.svg";
import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";

const API_BASE_URL = "https://sandbox-sparkborders.onrender.com/api"; // replace with your backend

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Read current URL
const redirectPath = new URLSearchParams(location.search).get("redirect") || "/dashboard";

  const loginMutation = useLogin(); // hook to call backend

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await loginMutation.mutateAsync({ email, password });
    
      if (!res.success) {
        throw new Error(res.message || "Login failed");
      }
    
      const user = res.data.user; // ✅ get user from data
      const token = res.data.token; // ✅ optional: save token
    
      // Save user & token
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    
      toast.success(`Welcome, ${user.name}!`);
    
      // Redirect
      navigate(redirectPath, { replace: true });
    
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    }
    
    
  };    

  const carouselImages = [Slide1, Slide2, Slide3];

  return (
    <div className="flex min-h-screen">
      {/* Left Side Carousel */}
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

      {/* Right Side Login */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm">
          {/* Logo + Heading */}
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="h-10 mx-auto mb-4" />
            <h2 className="text-3xl font-headings font-bold text-gray-900 pt-6">
              Log in to your account
            </h2>
            <p className="text-custom-black pt-2">Welcome back! Please enter your details.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-navy ${
                  errors.email ? "border-red-500" : "border-[#D0D5DD]"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-navy pr-10 ${
                    errors.password ? "border-red-500" : "border-[#D0D5DD]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm font-semibold">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-navy hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className={`w-full py-3 bg-navy font-semibold text-white rounded-xl hover:bg-navy transition ${
                loginMutation.isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Google Sign in */}
            <button
              type="button"
              className="w-full py-3 flex items-center border-[#D0D5DD] justify-center border rounded-xl hover:bg-gray-100 transition"
            >
              <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </form>

          {/* Signup link */}
          <p className="mt-6 text-center font-bold text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-navy hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
