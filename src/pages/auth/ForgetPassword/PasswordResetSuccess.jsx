import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


import Slide1 from "../../../assets/leftslider/img1.webp";
import Slide2 from "../../../assets/leftslider/img2.webp";
import Slide3 from "../../../assets/leftslider/img3.webp";



export default function PasswordResetSuccess() {
  const navigate = useNavigate();



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
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>

          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">
            Password Reset Successful
          </h2>
          <p className="text-gray-600 mb-6 font-inter">
            Your password has been successfully updated.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-navy text-white rounded-xl hover:bg-primary hover:text-navy transition font-inter"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
