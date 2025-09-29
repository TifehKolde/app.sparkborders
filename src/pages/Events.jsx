// src/pages/EventPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Search, MapPin, Calendar, Ticket, Info } from "lucide-react";
import { slugify } from "../utils/slugify";
import Footer from "../components/Footer";

export default function EventPage() {
  const [tab, setTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 4 per row, 2 rows

  // 🎨 Tag color palette
  const tagColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-orange-100 text-orange-700",
  ];

  // Sample events
  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      category: "Technology",
      location: "Lagos, Nigeria",
      date: "2025-10-15",
      time: "10:00 AM",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&q=80",
    },
    
    {
      id: 2,
      title: "Food & Drinks Expo",
      category: "Lifestyle",
      location: "Abuja, Nigeria",
      date: "2025-07-20",
      time: "12:00 PM",
      price: 8000,
      image:
        "https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=80",
    },
  ];

  const now = new Date();
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return tab === "upcoming" ? eventDate >= now : eventDate < now;
  });

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <>
    <div className="bg-[#f8fdff] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="bg-navy text-white py-20 text-center">
        <h1 className="text-5xl font-bold pt-10">Events</h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-200 text-lg">
          At Sparkborders, we bridge the gap between major distributor companies
          like Unilever, Nestlé, Cadbury, and Dangote Group and local wholesalers
        </p>

        {/* Search */}
        <div className="mt-8 flex justify-center">
          <div className="flex w-full max-w-lg">
            <input
              type="text"
              placeholder="Search events..."
              className="flex-1 px-4 py-3 bg-white rounded-l-lg text-gray-800 focus:outline-none text-base"
            />
            <button className="bg-primary text-navy px-5 rounded-r-lg flex items-center gap-2 hover:bg-primary/90 transition">
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-start max-w-7xl mx-auto px-6 mt-8">
        <div className="flex bg-white rounded-lg shadow p-1">
          {["upcoming", "past"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-md font-medium text-lg transition ${
                tab === t
                  ? "bg-navy text-white shadow"
                  : "text-gray-600 hover:text-navy"
              }`}
            >
              {t === "upcoming" ? "Upcoming" : "Past"}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {currentEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentEvents.map((event) => {
              const tagColor =
                tagColors[Math.floor(Math.random() * tagColors.length)];
              const eventDate = new Date(event.date);
              const isPast = eventDate < now;

              return (
                <Link
                  key={event.id}
                  to={`/events/${slugify(event.title)}`} // ✅ link to details page
                  className="relative transition overflow-hidden flex flex-col group"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Past Overlay */}
                    {isPast && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          This event has ended
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 bg-white">
                    {/* Tag */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium inline-block mb-3 w-fit ${tagColor}`}
                    >
                      {event.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-xl text-gray-800 mb-3">
                      {event.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center text-base text-gray-600 gap-2 mb-2">
                      <MapPin size={18} />
                      {event.location}
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center text-base text-gray-600 gap-2 mb-4">
                      <Calendar size={18} />
                      {eventDate.toDateString()} • {event.time}
                    </div>

                    {/* Price */}
                    <p className="text-base text-gray-600 mb-4">
                      from{" "}
                      <span className="font-bold text-navy text-lg">
                        ₦{event.price.toLocaleString()}
                      </span>
                    </p>

                    {/* CTA Button */}
                    <button
                      disabled={isPast}
                      onClick={(e) => e.preventDefault()} // ✅ prevent click if button only
                      className={`mt-auto w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium text-base transition ${
                        isPast
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-primary text-navy hover:bg-navy/90 hover:text-white"
                      }`}
                    >
                      <Ticket size={18} />
                      {isPast ? "Closed" : "Get Ticket"}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Info size={50} className="text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No {tab} events
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn’t find any {tab} events right now.
            </p>
            <button className="bg-navy text-white px-6 py-3 rounded-lg font-medium hover:bg-navy/90 transition">
              Explore Other Events
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentPage === i + 1
                    ? "bg-navy text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

  <Footer/>
    </>
  );
}
