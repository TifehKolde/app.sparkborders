// src/components/profile/Personal.jsx
import React from "react";
import { Camera } from "lucide-react";

export default function Personal({
  user,
  setUser,
  editing,
  setEditing,
  isEditing,
  handleSaveAll,
  handleCancelAll,
}) {
  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Heading + Avatar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Personal Details</h2>
          <p className="text-gray-600">Update your account information below</p>
        </div>
        <div className="relative">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-navy"
          />
          <label className="absolute bottom-0 right-0 bg-black/40 p-2 rounded-full cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                e.target.files[0] &&
                setUser({
                  ...user,
                  avatar: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <Camera className="h-5 w-5 text-white" />
          </label>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {/* Name */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <h3 className="font-medium">Name</h3>
            {!editing.name ? (
              <span className="text-gray-600">
                {user.firstName} {user.lastName}
              </span>
            ) : (
              <div className="flex gap-2 mt-1">
                <div>
                  <label className="block text-sm text-gray-500">First Name</label>
                  <input
                    type="text"
                    value={user.firstName}
                    placeholder="Enter first name"
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="bg-white py-2 px-6 shadow rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500">Last Name</label>
                  <input
                    type="text"
                    value={user.lastName}
                    placeholder="Enter last name"
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="bg-white py-2 px-6 shadow rounded"
                  />
                </div>
              </div>
            )}
          </div>
          <button
            className="text-navy font-medium hover:underline"
            onClick={() => setEditing({ ...editing, name: !editing.name })}
          >
            {editing.name ? "Done" : "Edit"}
          </button>
        </div>

        {/* Email */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <h3 className="font-medium">Email Address</h3>
            {!editing.email ? (
              <>
                <span className="text-gray-600">{user.email}</span>
                {!user.emailVerified && (
                  <p className="text-sm text-red-500 mt-1">
                    This email address isn’t verified yet, so you can’t use all
                    your account's features.
                    <button className="text-navy underline ml-1">
                      Resend verification email?
                    </button>
                  </p>
                )}
              </>
            ) : (
              <div className="mt-1">
                <input
                  type="email"
                  value={user.email}
                  placeholder="Enter email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-white py-2 px-6 shadow rounded"
                />
              </div>
            )}
          </div>
          <button
            className="text-navy font-medium hover:underline"
            onClick={() => setEditing({ ...editing, email: !editing.email })}
          >
            {editing.email ? "Done" : "Edit"}
          </button>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <h3 className="font-medium">Phone Number</h3>
            {!editing.phone ? (
              <span className="text-gray-600">{user.phone}</span>
            ) : (
              <div className="mt-1">
                <input
                  type="text"
                  value={user.phone}
                  placeholder="Enter phone number"
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="bg-white py-2 px-6 shadow rounded"
                />
              </div>
            )}
          </div>
          <button
            className="text-navy font-medium hover:underline"
            onClick={() => setEditing({ ...editing, phone: !editing.phone })}
          >
            {editing.phone ? "Done" : "Edit"}
          </button>
        </div>

        {/* Date of Birth */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <h3 className="font-medium">Date of Birth</h3>
            {!editing.dob ? (
              <span className="text-gray-600">
                {new Date(user.dob).toLocaleDateString()}
              </span>
            ) : (
              <div className="mt-1">
                <input
                  type="date"
                  value={user.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="bg-white py-2 px-6 shadow rounded"
                />
              </div>
            )}
          </div>
          <button
            className="text-navy font-medium hover:underline"
            onClick={() => setEditing({ ...editing, dob: !editing.dob })}
          >
            {editing.dob ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      {/* Global Save/Cancel */}
      <div className="flex gap-3 pt-6">
        <button
          disabled={!isEditing}
          onClick={handleSaveAll}
          className={`px-6 py-2 rounded text-white transition ${
            isEditing ? "bg-navy hover:bg-navy/90" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
        <button
          disabled={!isEditing}
          onClick={handleCancelAll}
          className={`px-6 py-2 rounded border transition ${
            isEditing
              ? "border-navy text-navy hover:bg-navy/10"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
