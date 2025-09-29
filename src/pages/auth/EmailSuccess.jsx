import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


//slider images
import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";

export default function EmailSuccess() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/accountsetup");
  //   }, 3000); // 3 seconds delay
  //   return () => clearTimeout(timer); // cleanup on unmount
  // }, [navigate]);



  //sliders
   const carouselImages = [Slide1, Slide2, Slide3];
  
  return (
    <div className="flex min-h-screen">
      {/* Left Side Illustration */}
     <div className="hidden md:flex w-1/2 bg-[#00008b] items-center justify-center">
     <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} loop pagination={{ clickable: true }} className="w-[500px] h-[700px] relative">
          {carouselImages.map((img, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <img src={img} alt={`Slide ${i + 1}`} className="object-cover w-full h-full rounded" />
            </SwiperSlide>
          ))}
        </Swiper>
                 </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm text-center">
          {/* Check Icon */}
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 rounded-full bg-green/10 border-10 border-green/20 text-green-500" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">
            Email Verified
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 font-inter">
            Your email address has been successfully verified.
          </p>

          {/* Continue Button */}
          <button
            onClick={() => navigate("/accountsetup")}
            className="w-full py-3 bg-navy text-white hover:text-navy rounded-xl hover:bg-primary transition font-inter"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
