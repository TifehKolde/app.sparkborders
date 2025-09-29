import { useEffect } from "react";

export default function RedirectToMain() {
  useEffect(() => {
    window.location.href = "https://sparkborders.com/";
  }, []);

  return <p>Redirecting to main site...</p>;
}
