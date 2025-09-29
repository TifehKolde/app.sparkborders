// src/components/CountdownTimer.jsx
import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = new Date(targetDate).getTime();

    if (isNaN(countdownDate)) {
      console.error("Invalid targetDate:", targetDate);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = countdownDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 text-center mt-2">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <div key={unit} className="  px-10 py-2 border-r border-gray-500 ">
          <p className="text-3xl font-bold text-white">{timeLeft[unit]}</p>
          <span className="text-xs uppercase text-gray-300">{unit}</span>
        </div>
      ))}
    </div>
  );
}
