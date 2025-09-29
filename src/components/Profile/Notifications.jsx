// src/components/profile/ProfileNotifications.jsx
import React, { useState } from "react";

export default function ProfileNotifications() {
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    marketing: true,
    accountUpdates: true,
    reservations: false,
  });

  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    setEditing(true);
  };

  const handleSave = () => {
    console.log("Saving notifications:", notifications);
    setEditing(false);
  };

  const handleCancel = () => {
    // reset to default (here I just reset to all true/false, but in real case use server values)
    setNotifications({
      marketing: true,
      accountUpdates: true,
      reservations: false,
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Email Notifications</h2>
        <p className="text-gray-600">
          Choose which notifications you’d like to receive in your inbox.
        </p>
      </div>

      {/* Notification toggles */}
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center py-3 border-b border-gray-200"
          >
            <div>
              <h3 className="font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h3>
              <p className="text-gray-600 text-sm">
                {key === "marketing" &&
                  "Stay updated with promotions, news and offers."}
                {key === "accountUpdates" &&
                  "Important updates about your account security and settings."}
                {key === "reservations" &&
                  "Get reminders and updates about your bookings."}
              </p>
            </div>

            {/* Modern toggle switch */}
            <button
              onClick={() => handleToggle(key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                value ? "bg-navy" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  value ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Save / Cancel */}
      {editing && (
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded bg-navy text-white hover:bg-navy/90"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded border border-navy text-navy hover:bg-navy/10"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
