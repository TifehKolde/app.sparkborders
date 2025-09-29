import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";

import Logo from "../../assets/logo.svg";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfileCamera() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      alert("Unable to access camera");
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);

    // Stop camera
    const tracks = videoRef.current.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
  };

  const handleSubmit = async () => {
    if (!capturedImage) return;

    setIsUploading(true);

    try {
      // Convert Base64 to Blob
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("media", blob, "profile.png");

      const token = localStorage.getItem("token"); // or wherever you store auth token

      const res = await axios.post(
        "https://sandbox-sparkborders.onrender.com/api/v1/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ Required if upload is protected
          },
        }
      );

      if (res.data.success) {
        toast.success("Profile image uploaded!");
        console.log("Uploaded URL:", res.data.data); // ✅ Save this URL to user profile

        navigate("/dashboard"); // or wherever next
      } else {
        toast.error(res.data.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Error uploading image");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    startCamera();
  }, []);


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

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-12">
        <div className="w-full max-w-md bg-white rounded-2xl p-8">
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-headings font-bold text-gray-900">
              Take Your Profile Picture
            </h2>
            <p className="text-gray-500 mt-2">
              Click the button below to capture your profile image
            </p>
          </div>

          <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
            {!capturedImage ? (
              <>
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay />
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-yellow-400 transition shadow-md"
                >
                  Capture
                </button>
              </>
            ) : (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover rounded-xl" />
            )}
          </div>

          <button
            type="button"
            disabled={!capturedImage || isUploading}
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-navy rounded-xl font-inter font-semibold hover:bg-yellow-400 transition mb-4 disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Add to Profile"}
          </button>

          <Link to="/idsetup" className="block text-center text-navy font-inter font-semibold hover:underline">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
