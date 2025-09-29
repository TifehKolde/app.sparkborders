import { useState } from "react"
import { Calendar, MapPin, Users } from "lucide-react"

export default function EventTabs({ galleryImages }) {
  const [activeTab, setActiveTab] = useState("gallery")

  return (
    <div className="mb-8">
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200 mb-6">
        {["gallery", "speakers", "schedule", "map"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold capitalize transition ${
              activeTab === tab
                ? "text-navy bg-white border-b-2 border-navy"
                : "text-gray-600 hover:text-navy"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Gallery */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="aspect-square">
              <img
                src={image || "/placeholder.svg"}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      {/* Speakers */}
      {activeTab === "speakers" && (
        <div className="text-center py-12 text-gray-500">
          <Users size={48} className="mx-auto mb-4" />
          <p>Speaker information coming soon...</p>
        </div>
      )}

      {/* Schedule */}
      {activeTab === "schedule" && (
        <div className="text-center py-12 text-gray-500">
          <Calendar size={48} className="mx-auto mb-4" />
          <p>Event schedule coming soon...</p>
        </div>
      )}

      {/* Map */}
      {activeTab === "map" && (
        <div className="text-center py-12 text-gray-500">
          <MapPin size={48} className="mx-auto mb-4" />
          <p>Location map coming soon...</p>
        </div>
      )}
    </div>
  )
}
