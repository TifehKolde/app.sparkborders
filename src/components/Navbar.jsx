// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  User,
  CreditCard,
  ClipboardList,
  Mail,
  Ticket,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import Logo from "../assets/logo.svg";
import { useCart } from "../context/CartContext"; // ✅ use CartContext

import { useAuth } from "../api/hooks/useAuth";

// Dummy user until API is ready
const user = {
  name: "Oyin",
  email: "oyin@example.com",
  avatar: "",
};

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const timeoutRef = useRef(null);

  // ✅ Real cart state
    const { user, logout } = useAuth(); // ✅ get dynamic user
    const { cart } = useCart();
    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);




  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Products",
      path: "https://sparkborders.com/products",
      hasDropdown: true,
      dropdownItems: [
        { name: "SparkTransact", path: "https://sparkborders.com/Sparktransact" },
        { name: "SparkTransport", path: "https://sparkborders.com/sparklogistic" },
        { name: "SparkEvent", path: "https://sparkborders.com/spark-event" },
        { name: "SparkConnect", path: "https://sparkborders.com/Sparkconnect" },
        { name: "SparkInvest", path: "https://sparkborders.com/Sparkinvest" },
      ],
    },
    { name: "About", path: "https://sparkborders.com/about" },
    { name: "FAQ", path: "https://sparkborders.com/faq" },
    { name: "Blog", path: "https://blog.sparkborders.com/" },
    { name: "Contact Us", path: "https://sparkborders.com/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollHeight ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(percent);
      setIsSticky(scrollTop > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowProductDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowProductDropdown(false);
    }, 150);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isSticky ? "shadow-md bg-[#00008B]" : "bg-[#00008B]"
      } border-b border-gray-200`}
      style={{ height: "80px" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-white items-center">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li
                key={link.name}
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <NavLink
                  to={link.path}
                  className="flex items-center hover:text-yellow-400"
                >
                  {link.name}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </NavLink>
                {showProductDropdown && (
                  <ul className="absolute left-0 mt-2 w-60 bg-white text-[#000000] rounded shadow-lg z-10">
                    {link.dropdownItems.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.path}
                          className="block px-4 py-2 hover:bg-[#D9D9EE]"
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {/* Cart */}
              <Link to="/cart" className="relative">
                <div className="bg-white text-black p-2 rounded-full">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-navy text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Welcome */}
              <span className="text-white font-medium">Welcome, {user.name}</span>

              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-1 bg-white rounded-full p-2 cursor-pointer"
                >
                  <User className="w-5 h-5 text-black" />
                  <ChevronDown
                    className={`w-4 h-4 text-black transition-transform ${
                      showUserDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showUserDropdown && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                    <li>
                      <Link to="/wallet" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <CreditCard className="w-4 h-4 mr-2" /> Wallet
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <ClipboardList className="w-4 h-4 mr-2" /> Orders
                      </Link>
                    </li>
                    <li>
                      <Link to="/ticket" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <Ticket className="w-4 h-4 mr-2" /> My Ticket
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="flex items-center px-4 py-2 hover:bg-gray-100">
                        <Mail className="w-4 h-4 mr-2" /> Contact Us
                      </Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-primary rounded px-4 py-2 border border-primary font-medium hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#FFBF00] text-navy font-semibold py-2 px-4 rounded hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

   {/* Mobile Sidebar + Overlay */}
<div
  className={`fixed inset-0 z-40 transition ${isOpen ? "visible" : "invisible"}`}
>
  {/* Overlay */}
  <div
    className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
      isOpen ? "opacity-100" : "opacity-0"
    }`}
    onClick={toggleMenu}
  />

  {/* Sidebar (full screen, slides from right) */}
  <div
    className={`absolute top-0 right-0 h-full w-full bg-white text-gray-700 transform transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Header with Logo + Close */}
    <div className="flex items-center justify-between px-4 py-4 border-b">
      <img src={Logo} alt="Logo" className="h-8" /> {/* 👈 Logo instead of text */}
      <button onClick={toggleMenu}>
        <X className="w-6 h-6 text-gray-700" />
      </button>
    </div>

    {/* Menu content */}
    <div className="p-6 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
      {user ? (
        <>
          {/* User Info */}
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
              <User className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <Link to="/cart" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
            <ShoppingCart className="w-5 h-5" /> Cart ({cartItemsCount})
          </Link>
          <Link to="/orders" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
            <ClipboardList className="w-5 h-5" /> Orders
          </Link>
          <Link to="/wallet" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
            <CreditCard className="w-5 h-5" /> Wallet
          </Link>
          <Link to="/ticket" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
            <Ticket className="w-5 h-5" /> My Ticket
          </Link>
          <Link to="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
            <User className="w-5 h-5" /> View Profile
          </Link>
          <Link to="/contact" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded">
            <Mail className="w-5 h-5" /> Contact Us
          </Link>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-red-600">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <Link
            to="/login"
            className="w-full text-center border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full text-center bg-[#FFBF00] text-black font-semibold py-2 rounded hover:opacity-90"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </div>
</div>


    </nav>
  );
};

export default Navbar;
