// src/pages/Profile.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Lock, Bell } from "lucide-react";

import Personal from "../components/Profile/personal";
import Security from "../components/Profile/Security";
import Notifications from "../components/Profile/Notifications";

import Ava from "../assets/avatar.webp";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");

  const [editing, setEditing] = useState({
    name: false,
    email: false,
    phone: false,
    dob: false,
  });

  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    emailVerified: false,
    phone: "+2348012345678",
    dob: "1990-01-01",
    avatar: Ava,
  });

  const isEditing = Object.values(editing).some((v) => v);

  const handleSaveAll = () => {
    console.log("Saving user:", user);
    setEditing({ name: false, email: false, phone: false, dob: false });
  };

  const handleCancelAll = () => {
    setEditing({ name: false, email: false, phone: false, dob: false });
  };

  const tabs = [
    { id: "personal", label: "Personal Details", icon: <User size={20} /> },
    { id: "security", label: "Security", icon: <Lock size={20} /> },
    { id: "notifications", label: "Email Notification", icon: <Bell size={20} /> },
  ];

  return (
    <div className="bg-[#F8FDFF] min-h-screen py-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
<aside className="md:col-span-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4 h-full self-start">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className="flex items-center gap-3 p-3 border-b last:border-b-0 border-gray-300 transition"
    >
      <span
        className={`p-2 rounded-full transition ${
          activeTab === tab.id
            ? "bg-navy/20 text-navy"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {tab.icon}
      </span>
      <span
        className={`font-medium transition ${
          activeTab === tab.id ? "text-navy" : "text-gray-700"
        }`}
      >
        {tab.label}
      </span>
    </button>
  ))}
</aside>


        {/* Content Area */}
        <div className="md:col-span-3 p-6">
          {activeTab === "personal" && (
            <Personal
              user={user}
              setUser={setUser}
              editing={editing}
              setEditing={setEditing}
              isEditing={isEditing}
              handleSaveAll={handleSaveAll}
              handleCancelAll={handleCancelAll}
            />
          )}
          {activeTab === "security" && <Security />}
          {activeTab === "notifications" && <Notifications />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
