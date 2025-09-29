// src/pages/MyTicketsPage.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Calendar, Clock, Printer, Search } from "lucide-react";
import { useState } from "react";

export default function MyTicketsPage() {
  const tickets = [
    {
      id: "TCK-2025-001",
      event: "Tech Conference 2025",
      date: "20 Sep 2025",
      time: "10:00 AM",
      location: "Eko Hotel, Lagos",
      qty: 4,
      status: "Upcoming",
    },
    {
      id: "TCK-2025-002",
      event: "Music Festival",
      date: "05 Sep 2025",
      time: "6:00 PM",
      location: "Landmark Beach, Lagos",
      qty: 2,
      status: "Past",
    },
    {
      id: "TCK-2025-003",
      event: "Startup Pitch Night",
      date: "01 Aug 2025",
      time: "5:00 PM",
      location: "Civic Centre, Lagos",
      qty: 1,
      status: "Past",
    },
  ];

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter(
    (t) =>
      t.status === activeTab &&
      t.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-[#f8fdff] pt-16">
        <Navbar />

        {/* Hero Section */}
        <div className="text-center py-16 bg-navy text-white flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-bold mt-4">Your Event Tickets</h1>
          <p className="mt-3 max-w-2xl text-gray-200">
            View and manage all your event tickets in one place.
          </p>
        </div>

        {/* Tickets Section */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto py-8 sm:py-12">
          {/* Tabs + Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex gap-3 bg-white p-1 rounded shadow w-fit">
  {["Upcoming", "Past"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-5 py-2 rounded font-medium transition capitalize ${
        activeTab === tab
          ? "bg-navy text-white shadow"
          : "text-navy"
      }`}
    >
      {tab}
    </button>
  ))}
</div>


            <div className="relative w-full bg-white sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-navy"
              />
            </div>
          </div>

          {/* Ticket List */}
          {filteredTickets.length > 0 ? (
            <div className="space-y-8">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                >
                  {/* Card (Left, ATM Style) */}
                  <div className="flex-1 max-w-2xl bg-white rounded overflow-hidden shadow-lg hover:shadow-xl transition">
                    {/* Header strip */}
                    <div className="bg-navy text-white px-6 py-3">
                      <h3 className="font-semibold text-lg">{ticket.event}</h3>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <MapPin size={16} /> {ticket.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} /> {ticket.date} | <Clock size={16} />{" "}
                        {ticket.time}
                      </div>
                    </div>
                  </div>

                  {/* Actions (Right, beside card) */}
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <p className="font-medium text-sm text-gray-700">
                      {ticket.qty} Attendee Tickets
                    </p>
                    <p className="text-xs text-gray-500">
                      Valid for entry once scanned
                    </p>
                    <button className="flex items-center gap-2 bg-white border border-navy/80 text-navy px-4 py-2 rounded-lg hover:bg-navy/90 hover:text-white transition text-sm">
                      <Printer size={16} /> Print Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No {activeTab.toLowerCase()} tickets found.
            </p>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
