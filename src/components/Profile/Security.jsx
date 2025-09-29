// src/components/profile/ProfileSecurity.jsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ProfileSecurity() {
  const [editing, setEditing] = useState({
    password: false,
  });

  const [security, setSecurity] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const isEditing = Object.values(editing).some((v) => v);

  const handleChange = (field, value) => {
    setSecurity({ ...security, [field]: value });
  };

  const handleSaveAll = () => {
    console.log("Saving security details:", security);
    setEditing({ password: false });
  };

  const handleCancelAll = () => {
    setEditing({ password: false });
  };

  const handleDelete = () => {
    console.log("Deleting account because:", deleteReason);
    setDeleteModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Security</h2>
        <p className="text-gray-600">
          Manage your account password and security preferences
        </p>
      </div>

      {/* Security Fields */}
      <div className="space-y-4">
        {/* Password */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div className="w-full">
            <h3 className="font-medium">Password</h3>
            {!editing.password ? (
              <span className="text-gray-600">********</span>
            ) : (
              <div className="mt-2 space-y-4">
                {/* New password */}
                <div>
                  <label className="block text-sm text-gray-500">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      placeholder="Enter new password"
                      value={security.newPassword}
                      onChange={(e) =>
                        handleChange("newPassword", e.target.value)
                      }
                      className="w-full border rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-navy/40 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({ ...showPassword, new: !showPassword.new })
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-sm text-gray-500">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={security.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      className="w-full border rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-navy/40 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirm: !showPassword.confirm,
                        })
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword.confirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="text-navy font-medium hover:underline ml-4"
            onClick={() =>
              setEditing({ ...editing, password: !editing.password })
            }
          >
            {editing.password ? "Done" : "Edit"}
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-red-600">Delete Account</h3>
            <p className="text-gray-600 text-sm">
              Permanently remove your account and all associated data.
            </p>
          </div>
          <button
            className="text-red-600 font-medium hover:underline"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Global Save/Cancel */}
      <div className="flex gap-3 pt-6">
        <button
          disabled={!isEditing}
          onClick={handleSaveAll}
          className={`px-6 py-2 rounded text-white transition ${
            isEditing
              ? "bg-navy hover:bg-navy/90"
              : "bg-gray-400 cursor-not-allowed"
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

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-red-600">
              Delete Your Account
            </h3>
            <p className="text-gray-600">
              Before you delete your account, please tell us why:
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="deleteReason"
                  value="unsubscribe"
                  checked={deleteReason === "unsubscribe"}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="accent-navy"
                />
                <span>
                  I get too many emails. I prefer to{" "}
                  <span className="text-navy underline">unsubscribe</span>.
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="deleteReason"
                  value="changeEmail"
                  checked={deleteReason === "changeEmail"}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="accent-navy"
                />
                <span>
                  I want to use a different email address for my account.
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="deleteReason"
                  value="removeData"
                  checked={deleteReason === "removeData"}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  className="accent-navy"
                />
                <span>
                  I want to remove all my data and permanently close my account.
                </span>
              </label>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              When your account is deleted, you’ll lose access to your data,
              reservations, favorites, and benefits.
            </p>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                disabled={!deleteReason}
                onClick={handleDelete}
                className={`px-6 py-2 rounded text-white transition ${
                  deleteReason
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
