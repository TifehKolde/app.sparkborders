"use client";

import { useParams } from "react-router-dom";
import { slugify } from "../utils/slugify";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TicketRow from "../components/Events/TicketRow";
import SponsorCard from "../components/Events/SponsorCard";
import EventCard from "../components/Events/EventCard";
import EventTabs from "../components/Events/EventTabs";
import CountdownTimer from "../components/Events/CountdownTimer";
import Breadcrumb from "../components/Breadcrumb";

export default function EventDetails() {
  const { slug } = useParams();
  const [adultTickets, setAdultTickets] = useState(1);
  const [teenTickets, setTeenTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  // Sample events (replace with API later)
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
      description:
        "Join us for Tech Conference 2025, where industry leaders share insights on innovation, AI, and the future of technology.",
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
      description:
        "Taste, explore, and connect at the Food & Drinks Expo, showcasing Nigeria's finest cuisine and beverages.",
    },
  ];

  // Find event by slug
  const event = events.find((e) => slugify(e.title) === slug);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Event not found</h2>
      </div>
    );
  }

  // ✅ Safely parse event date + time into a Date object
  const targetDate = new Date(`${event.date} ${event.time}`);

  const galleryImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
    "https://images.unsplash.com/photo-1492684223066-813c990c692c?w=400&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80",
    "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&q=80",
  ];

  const upcomingEvents = [
    {
      id: 3,
      title: "Music Festival 2025",
      category: "Entertainment",
      location: "Port Harcourt, Nigeria",
      date: "2025-08-15",
      time: "6:00 PM",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    },
    {
      id: 4,
      title: "Business Summit",
      category: "Business",
      location: "Kano, Nigeria",
      date: "2025-09-10",
      time: "9:00 AM",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80",
    },
    {
      id: 5,
      title: "Art Exhibition",
      category: "Arts",
      location: "Ibadan, Nigeria",
      date: "2025-11-05",
      time: "2:00 PM",
      price: 3000,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-[#f8fdff] min-h-screen">
        {/* Hero Section */}
        <div className="relative pt-16">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-[30rem] object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center px-6">
            <div className="text-white max-w-7xl mx-auto w-full">
              <div className="max-w-2xl">
              <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Events", to: "/events" },
              
            ]}
          />
                <h1 className="text-4xl sm:text-5xl font-bold mt- mb-6">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-6 mb-6 text-gray-200">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} /> {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} /> {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} /> {event.time}
                  </div>
                </div>
                <button className="bg-primary text-navy px-6 py-3 rounded-lg flex items-center gap-2 font-semibold hover:bg-gray-100 transition">
                  <Ticket size={18} /> Get Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="bg-navy  py-10">
          <div className="max-w-4xl mx-auto text-center">
          
            {/* ✅ Reusable component */}
            <CountdownTimer targetDate={targetDate} />
          </div>
        </div>

        {/* Main Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Info */}
            <div className="lg:col-span-2">
              {/* About */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {event.description}
                </p>
                <button className="text-navy font-semibold hover:text-navy/80 transition border-b-2 border-navy">
                  Learn More
                </button>
              </div>

              {/* Tabs */}
              <EventTabs galleryImages={galleryImages} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Ticket Box */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-6 pb-4  border-b border-gray-200 ">Get Your Ticket</h3>

                <TicketRow
                  label="Adult"
                  price={event.price}
                  description="Full access to all sessions"
                  count={adultTickets}
                  setCount={setAdultTickets}
                />
                <TicketRow
                  label="Teen"
                  price={Math.floor(event.price * 0.7)}
                  description="Ages 13-17, limited access"
                  count={teenTickets}
                  setCount={setTeenTickets}
                />
                <TicketRow
                  label="Children"
                  price={Math.floor(event.price * 0.5)}
                  description="Ages 5-12, supervised access"
                  count={childTickets}
                  setCount={setChildTickets}
                />

                <button className="w-full bg-primary text-navy py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition flex items-center justify-center gap-2">
                  <Ticket size={18} /> Get Tickets
                </button>
              </div>

              {/* Sponsor Box */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-6">Become a Sponsor</h3>
                <SponsorCard
                  title="Sponsor Package"
                  description="Partner with us to reach thousands of attendees and showcase your brand at this premier event."
                  type="sponsorship"
                />
                <SponsorCard
                  title="Own a Stand"
                  description="Set up your exhibition stand and connect directly with potential customers and partners."
                  type="stand"
                />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((upcomingEvent) => (
                <EventCard key={upcomingEvent.id} event={upcomingEvent} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
