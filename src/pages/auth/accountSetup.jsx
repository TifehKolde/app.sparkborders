import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Logo from "../../assets/logo.svg";
import Slide1 from "../../assets/leftslider/img1.webp";
import Slide2 from "../../assets/leftslider/img2.webp";
import Slide3 from "../../assets/leftslider/img3.webp";
import { completeOnboarding as completeOnboardingApi } from "../../api/authClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingButton from "../../components/LoadingButton";

export default function AccountSetup() {
  const [accountType, setAccountType] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [productInput, setProductInput] = useState("");
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});


  

  const navigate = useNavigate();
  const pendingEmail = localStorage.getItem("pendingEmail"); // from previous step

  // Fetch countries
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => res.json())
      .then((data) => setCountries(data.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  // Update states when country changes
  useEffect(() => {
    const selected = countries.find((c) => c.name === country);
    setStates(selected ? selected.states : []);
    setState("");
  }, [country, countries]);

  // Remove error on value change
  const handleFieldChange = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: undefined, api: undefined }));
    switch (field) {
      case "accountType":
        setAccountType(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "state":
        setState(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "productInput":
        setProductInput(value);
        break;
      default:
        break;
    }
  };

  // Product tag handlers
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && productInput.trim() !== "") {
      e.preventDefault();
      if (!products.includes(productInput.trim())) {
        setProducts([...products, productInput.trim()]);
        setErrors((prev) => ({ ...prev, products: undefined }));
      }
      setProductInput("");
    }
  };

  const removeTag = (product) => {
    setProducts(products.filter((p) => p !== product));
  };

  // React Query mutation
  const mutation = useMutation({
    mutationFn: (data) => completeOnboardingApi(data),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Account setup complete!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
        localStorage.removeItem("pendingEmail");
        navigate("/idsetup"); // next step
      } else {
        setErrors({ api: res.message || "Unable to complete onboarding" });
      }
    },
    onError: (err) => {
      console.error(err);
      setErrors({ api: "Something went wrong. Try again." });
    },
  });

  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!accountType) newErrors.accountType = "Select account type";
    if (!country) newErrors.country = "Select country";
    if (!state) newErrors.state = "Select state";
    if (!address.trim()) newErrors.address = "Enter address";
    if (products.length === 0) newErrors.products = "Add at least one product";
    if (!pendingEmail) newErrors.api = "No email found. Please register again.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validateForm()) return;
  
    // Save form data temporarily in localStorage
    const accountData = {
      accountType,
      country,
      state,
      address,
      products,
    };
    localStorage.setItem("accountData", JSON.stringify(accountData));
  
    // Move to next step
    navigate("/idsetup");
  };
  

// slider images
    const carouselImages = [Slide1, Slide2, Slide3];



  return (
    <div className="flex flex-col md:flex-row min-h-screen">
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

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 sm:px-6 md:px-12 py-8 md:py-0">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center mb-6">
            <img src={Logo} alt="Logo" className="h-10 mx-auto mb-2" />
            <h2 className="text-2xl md:text-3xl font-headings font-bold text-black">
              Complete your account creation
            </h2>
          </div>

          {/* API Error */}
          {errors.api && (
            <p className="text-red-500 text-sm text-center mb-3">{errors.api}</p>
          )}

          {/* Form */}
          <form className="space-y-5">
            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-custom-black mb-1 font-inter">
                Account Type
              </label>
              <select
                value={accountType}
                onChange={(e) => handleFieldChange("accountType", e.target.value)}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-primary font-inter text-sm md:text-base"
              >
                <option value="">Select account type</option>
                <option value="distributor">Distributor</option>
                <option value="wholesaler">Wholesaler</option>
                <option value="retailer">Retailer</option>
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-xs mt-1">{errors.accountType}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-custom-black mb-1 font-inter">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-primary font-inter text-sm md:text-base"
              >
                <option value="">Select country</option>
                {countries.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-custom-black mb-1 font-inter">
                State
              </label>
              <select
                value={state}
                onChange={(e) => handleFieldChange("state", e.target.value)}
                disabled={!country}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-primary font-inter 
                disabled:bg-gray-100 text-sm md:text-base"
              >
                <option value="">Select state</option>
                {states.map((s, i) => (
                  <option key={i} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-custom-black mb-1 font-inter">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                placeholder="Enter your address"
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-primary font-inter text-sm md:text-base"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* Products Interested */}
            <div>
              <label className="block text-sm font-medium text-custom-black mb-1 font-inter">
                Products Interested
              </label>
              <div className="w-full min-h-[100px] px-3 py-2 border border-[#D0D5DD] rounded-xl 
              focus-within:ring-2 focus-within:ring-primary flex flex-wrap gap-2 items-start">
                {products.map((product, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 
                    px-3 py-1 rounded-full text-xs md:text-sm"
                  >
                    {product}
                    <button
                      type="button"
                      onClick={() => removeTag(product)}
                      className="text-blue-500 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}

                <textarea
                  rows={2}
                  value={productInput}
                  onChange={(e) => handleFieldChange("productInput", e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type and press Enter"
                  className="flex-1 outline-none resize-none border-none 
                  focus:ring-0 text-sm p-1 font-inter"
                />
              </div>
              {errors.products && (
                <p className="text-red-500 text-xs mt-1">{errors.products}</p>
              )}
              <p className="text-xs text-custom-black mt-1 font-inter">
                Add multiple products (press Enter or comma)
              </p>
            </div>

            {/* Continue Button */}
            <LoadingButton
  isLoading={false} // no API call here
  onClick={handleContinue}
>
  Get Started
</LoadingButton>


          </form>

          {/* Back Link */}
          <p className="mt-6 text-center font-inter text-sm text-custom-black">
            <Link to="/emailcheck" className="text-navy hover:underline">
              Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
