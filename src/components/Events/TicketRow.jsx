import { Minus, Plus } from "lucide-react";

export default function TicketRow({ label, price, description, count, setCount }) {
  const isAdult = label.toLowerCase().includes("adult"); // check if this is Adult ticket
  const minValue = isAdult ? 1 : 0; // Adult min is 1, others 0

  return (
    <div className="flex items-center justify-between mb-4 pb-4">
      {/* Left side: Label + Price */}
      <div>
        <div className="flex items-center gap-4">
          <h4 className="font-semibold">{label}</h4>
          <span className="font-semibold text-navy">₦{price}</span>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Right side: Counter */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCount(Math.max(minValue, count - 1))}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            count <= minValue
              ? "bg-navy/20 text-navy cursor-not-allowed" // disabled look
              : "bg-navy text-white hover:bg-navy/40"
          }`}
          disabled={count <= minValue}
        >
          <Minus size={16} />
        </button>

        <span className="w-8 text-center font-semibold">{count}</span>

        <button
          onClick={() => setCount(count + 1)}
          className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center hover:bg-navy/90 transition"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
