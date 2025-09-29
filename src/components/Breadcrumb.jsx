// src/components/Breadcrumb.jsx
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [], cart = [], selected = [] }) {
  // ✅ Auto-generate items if not passed
  if (!items.length && cart.length) {
    // Use selected item or fallback to first in cart
    const selectedItem =
      selected.length > 0 ? cart.find((i) => i.id === selected[0]) : cart[0];

    items = [{ label: "Home", to: "/" }];

    // ✅ Collect unique distributors/manufacturers
    const distributors = [
      ...new Set(cart.map((i) => i.distributorName).filter(Boolean)),
    ];
    const manufacturers = [
      ...new Set(cart.map((i) => i.manufacturerName).filter(Boolean)),
    ];

    // ✅ Add distributor breadcrumb if exists
    if (distributors.length > 0) {
      items.push({ label: "Distributors", to: "/distributors" });
      if (selectedItem?.distributorName) {
        items.push({
          label: selectedItem.distributorName,
          to: `/distributors/${selectedItem.distributorId || ""}`,
        });
      }
    }

    // ✅ Add manufacturer breadcrumb if exists
    if (manufacturers.length > 0) {
      items.push({ label: "Manufacturers", to: "/manufacturers" });
      if (selectedItem?.manufacturerName) {
        items.push({
          label: selectedItem.manufacturerName,
          to: `/manufacturers/${selectedItem.manufacturerId || ""}`,
        });
      }
    }

    // ✅ Always end with cart
    items.push({ label: "Cart" });
  }

  return (
    <nav className="text-xl flex items-center space-x-1 text-gray-300 pb-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-1">
          {item.to ? (
            <Link to={item.to} className="hover:text-white hover:underline transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-semibold">{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronRight size={14} className="text-gray-400" />}
        </div>
      ))}
    </nav>
  );
}
