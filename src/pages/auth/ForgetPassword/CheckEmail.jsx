import { useNavigate, useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthCarousel from "../../../components/AuthCarousel";

export default function CheckEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "user@example.com";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
                  <AuthCarousel />
                  </div>

      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm text-center">
          <div className="flex justify-center mb-4">
            <Mail className="w-14 h-14 text-navy" />
          </div>

          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-gray-600 mb-6 font-inter">
            We sent a password reset link to <strong>{email}</strong>. 
            Please check your email to continue.
          </p>

          <button
            onClick={() => navigate("/set-new-password")}
            className="w-full py-3 bg-navy text-white rounded-xl hover:bg-primary hover:text-navy transition font-inter mb-3"
          >
            Open Email App
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-navy font-semibold hover:underline font-inter"
          >
            Didn’t receive the email? Resend
          </button>
        </div>
      </div>
    </div>
  );
}
