// components/LoadingButton.jsx
import React from "react";

export default function LoadingButton({
  isLoading = false,
  onClick,
  disabled = false,
  loadingText = "Processing...",
  children,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={!isLoading && !disabled ? onClick : undefined}
      disabled={isLoading || disabled}
      className={`w-full py-3 rounded-xl transition flex items-center justify-center ${
        isLoading
          ? "bg-navy text-white opacity-70 cursor-not-allowed"
          : "bg-navy text-white hover:text-navy hover:bg-primary"
      } ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
