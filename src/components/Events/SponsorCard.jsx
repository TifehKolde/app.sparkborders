import { useState } from "react";
import SponsorFormModal from "./SponsorFormModal";

export default function SponsorCard({ title, description, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mb-6">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="text-navy text-sm font-semibold hover:text-navy/80 transition border-b border-navy"
        >
          Learn More
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <SponsorFormModal
          isOpen={true}
          onClose={() => setIsOpen(false)}
          title={
            type === "sponsorship"
              ? "Add information to apply for Sponsorship"
              : "Add information to apply for a Stand"
          }
        />
      )}
    </>
  );
}
