import { MapPin, Calendar, Clock } from "lucide-react"

export default function EventCard({ event }) {
  return (
    <div className=" rounded-lg overflow-hidden  transition">
      <img
        src={event.image || "/placeholder.svg"}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          {event.category}
        </span>
        <h3 className="text-lg font-semibold mt-3 mb-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} /> {event.location}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {event.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} /> {event.time}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-navy">₦{event.price}</span>
          <button className="bg-primary text-navy px-4 py-2 rounded-lg text-sm hover:bg-navy hover:text-white transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
