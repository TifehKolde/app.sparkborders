import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Mail } from "lucide-react";
import { verifyOtp, resendOtp } from "../../api/authClient";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";

import LoadingButton from "../../components/LoadingButton";

export default function EmailCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [resending, setResending] = useState(false);
  const inputsRef = useRef([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const carouselImages = [Slide1, Slide2, Slide3];

  // ✅ Verify OTP mutation
  const verifyMutation = useMutation({
    mutationFn: ({ otp }) => verifyOtp({ otp }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Email verified successfully!", { position: "bottom-right", autoClose: 3000 });
        navigate("/emailsuccess");
      } else {
        toast.error(res.message || "Verification failed", { position: "bottom-right", autoClose: 4000 });
      }
    },
    onError: () => {
      toast.error("Something went wrong. Try again.", { position: "bottom-right", autoClose: 4000 });
    },
    onSettled: () => setIsProcessing(false), // ✅ stop spinner
  });

  // ✅ Resend OTP mutation
  const resendMutation = useMutation({
    mutationFn: resendOtp,
    onMutate: () => setResending(true),
    onSettled: () => setResending(false),
    onSuccess: (res) => {
      if (res.success) toast.success("OTP resent successfully!", { position: "bottom-right" });
      else toast.error(res.message || "Could not resend OTP", { position: "bottom-right" });
    },
    onError: () => toast.error("Something went wrong while resending.", { position: "bottom-right" }),
  });

  // Input handling
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) inputsRef.current[index + 1]?.focus();
      if (!value && index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otp = code.join("");
    if (otp.length < 4) {
      toast.error("Please enter the 4-digit code.", { position: "bottom-right" });
      return;
    }

    setIsProcessing(true);
    verifyMutation.mutate({ otp });
  };

  const handleResend = () => resendMutation.mutate();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Carousel */}
      <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} loop pagination={{ clickable: true }} className="w-[500px] h-[700px] relative">
          {carouselImages.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <img src={img} alt={`Slide ${i + 1}`} className="object-cover w-full h-full rounded" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm text-center bg-gray-50 rounded-2xl p-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-navy/10 border-10 border-navy/20 flex items-center justify-center">
              <Mail className="w-10 h-10 text-navy" />
            </div>
          </div>

          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">Verify Email</h2>
          <p className="text-gray-600 mb-6 font-inter">Enter the 4-digit verification code sent to your email.</p>

          <div className="flex justify-between mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-14 h-14 border border-[#D0D5DD] rounded-xl text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-navy font-inter"
              />
            ))}
          </div>

          {/* ✅ Verify Button */}
          <LoadingButton isLoading={isProcessing} onClick={handleVerify} loadingText="Verifying...">
            Verify Email
          </LoadingButton>

          <p className="mt-4 text-gray-500 text-sm font-inter">
            Didn’t receive the email?{" "}
            <button onClick={handleResend} disabled={resending} className="text-navy font-semibold hover:underline">
              {resending ? "Resending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
