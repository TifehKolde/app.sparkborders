import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";




export default function EmailCheck() {
  const navigate = useNavigate();

      const carouselImages = [Slide1, Slide2, Slide3];

  return (
    <div className="flex min-h-screen bg-gray-50">
     
          {/* Left Side Carousel - hidden on mobile */}
       
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

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-sm text-center bg-gray-50 rounded-2xl p-8">
          {/* Mail Icon */}
          <div className="flex justify-center mb-4">
            <Mail className="w-14 h-14 text-navy" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-headings font-bold text-gray-900 mb-2">
            Check your email
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 font-inter">
            We sent a verification link to your email address. Please confirm to
            continue.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/emailcode")}
            className="w-full py-3 bg-navy text-white rounded-xl hover:bg-primary hover:text-navy transition font-inter"
          >
            Enter code manually
          </button>
        </div>
      </div>
    </div>
  );
}
