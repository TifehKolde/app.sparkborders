import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Logo from "../../assets/logo.svg";
import Google from "../../assets/google.svg";
import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";

import { useCheckEmail, useCheckUserName, useRegisterUser } from "../../api/useAuthMutations";
import  toast  from "react-hot-toast";


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  //Mutation
  const { mutate: checkEmailMutate, isLoading: checkingEmail } = useCheckEmail();
  const { mutate: checkUsernameMutate, isLoading: checkingUsername } = useCheckUserName();
  const { mutate: registerUserMutate, isLoading: registering } = useRegisterUser();

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = "Enter a valid email";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    else if (/\s/.test(password)) newErrors.password = "Password cannot contain spaces";
    else if (!/^(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))
      newErrors.password = "Must be 8+ chars, include number & special character";
    return newErrors;
  };

  useEffect(() => {
    const newErrors = validateForm();
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [name, email, username, password]);


  //Registration function
  const handleRegister = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const passwordValue = password;

    const validationErrors = validateForm();
    const firstError = Object.values(validationErrors)[0];
    if (firstError) {
      toast.error(firstError, { position: "bottom-right", autoClose: 3000 });
      return;
    }
    
    setIsProcessing(true); // ✅ Force spinner on immediately


    checkEmailMutate(
      { email: trimmedEmail },
      {
        onSuccess: (emailRes) => {
          if (!emailRes.success) {
            toast.error(emailRes.message || "Email already exists", { position: "bottom-right" });

            setIsProcessing(false); // ❌ Stop spinner

            return;
          }

          checkUsernameMutate(
            { userName: trimmedUsername },
            {
              onSuccess: (usernameRes) => {
                if (!usernameRes.success) {
                  toast.error(usernameRes.message || "Username already taken", { position: "bottom-right" });
                  setIsProcessing(false); // ❌ Stop spinner

                  return;
                }

                registerUserMutate(
                  {
                    name: trimmedName,
                    email: trimmedEmail,
                    userName: trimmedUsername,
                    password: passwordValue,
                  },
                  {
                    onSuccess: (registerRes) => {
                      if (!registerRes.success) {
                        toast.error(registerRes.message || "Registration failed", { position: "bottom-right" });
                        setIsProcessing(false); // ❌ Stop spinner

                        return;
                      }


                      localStorage.setItem("pendingEmail", trimmedEmail);
                      navigate("/emailcheck");
                      toast.success("Registration successful! Check your email for OTP.", { position: "bottom-right" });
                    },
                    onError: () => {
                      toast.error("Something went wrong during registration", { position: "bottom-right" });
                      setIsProcessing(false); // ❌ Stop spinner

                    },
                  }
                );
              },
              onError: (err) => {
                const msg = err?.response?.data?.message || "Unable to verify username. Try again.";
                toast.error(msg, { position: "bottom-right" });
                setIsProcessing(false); // ❌ Stop spinner

              },
            }
          );
        },
        onError: (err) => {
          const msg = err?.response?.data?.message || "Unable to verify email. Try again.";
          toast.error(msg, { position: "bottom-right" });
          setIsProcessing(false); // ❌ Stop spinner

        },
      }
    );
  };




  //left slider image
  const carouselImages = [Slide1, Slide2, Slide3];

  const [loadingStep, setLoadingStep] = useState(null); // 'email' | 'username' | 'register' | null
  const [isProcessing, setIsProcessing] = useState(false);



  return (
    <div className="flex min-h-screen">
      {/* Left Carousel */}
      <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} loop pagination={{ clickable: true }} className="w-[500px] h-[700px]">
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="object-cover w-full h-full rounded" /></SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-2">
            <img src={Logo} alt="Logo" className="h-10 mx-auto" />
            <h2 className="text-3xl font-headings font-bold text-black pt-2">Create an account</h2>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-lg mb-1">Name*</label>
              <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
            </div>

            <div>
              <label className="block text-lg mb-1">Email*</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
            </div>

            <div>
              <label className="block text-lg mb-1">Username*</label>
              <input type="text" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
            </div>

            <div>
              <label className="block text-lg mb-1">Password*</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
  type="button"
  onClick={!isProcessing ? handleRegister : undefined}
  className={`w-full py-3 rounded-xl transition ${
    !isFormValid ? "bg-gray-300 cursor-not-allowed" :
    isProcessing ? "bg-navy text-white opacity-80" :
    "bg-navy text-white hover:bg-primary"
  }`}
>
  {isProcessing ? (
    <span className="flex items-center justify-center gap-2">
      <span className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
      Processing...
    </span>
  ) : (
    "Complete your profile"
  )}
</button>



            {/* Google Button */}
            <button
              type="button"
              disabled={registering || checkingEmail || checkingUsername}
              className="w-full py-3 flex items-center justify-center border rounded-xl"
            >
              {registering ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  Loading...
                </span>
              ) : (
                <>
                  <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
                  Sign up with Google
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account? <Link to="/login" className="text-navy hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
