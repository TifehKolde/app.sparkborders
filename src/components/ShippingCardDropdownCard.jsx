// src/components/DropdownCard.jsx
import { useState } from "react";
import { MoreVertical } from "lucide-react";

export default function DropdownCard({ title, children, options = [] }) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative bg-white rounded-xl p-6 shadow space-y-2">
      {/* Three-dot button */}
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
      >
        <MoreVertical size={20} />
      </button>

      {/* Dropdown menu */}
      {openMenu && (
        <div className="absolute top-10 right-4 bg-white shadow-lg rounded-md w-36 z-10 border border-gray-200">
          {options.map((opt) => (
           <button
           key={opt.label}
           className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm ${
             opt.isDelete ? "text-red-500" : "text-gray-700"
           }`}
           onClick={() => {
             opt.onClick?.();
             setOpenMenu(false);
           }}
         >
           {opt.icon}
           <span>{opt.label}</span>
         </button>
          ))}
        </div>
      )}

      <h3 className="font-semibold text-lg">{title}</h3>
      {children}
    </div>
  );
}
