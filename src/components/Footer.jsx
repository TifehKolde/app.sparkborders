import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contact Details */}
        <div>
          <h3 className="font-bold text-lg mb-4">Contact Us</h3>
          <p className="text-sm mb-2">No. 10 Dele Ogunbowale Street, Off Whitesands Avenue, Lekki, Lagos.</p>
          <p className="text-sm mb-2">Email: hello@sparkborders.com</p>
          <p className="text-sm">Phone: +234 703 297 3274</p>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-bold text-lg mb-4">Our products</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sparktransact" className="hover:text-navy">SparkTransact</Link></li>
            <li><Link to="/sparklogistic" className="hover:text-navy">SparkTransport</Link></li>
            <li><Link to="/spark-event" className="hover:text-navy">SparkEvent</Link></li>
            <li><Link to="/Sparkconnect" className="hover:text-navy">SparkConnect</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-bold text-lg mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-navy">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-navy">FAQ</Link></li>
            <li><Link to="https://blog.sparkborders.com/" className="hover:text-navy">Resources</Link></li>
            <li><Link to="/Careers" className="hover:text-navy">Careers</Link></li>
          </ul>
        </div>

     {/* Social Media */}
<div>
  <h3 className="font-bold text-lg mb-4">Follow Us</h3>
  <div className="flex space-x-4">
    <a
      href="https://web.facebook.com/profile.php?id=61578244187879"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-navy transition"
    >
      <Facebook className="w-5 h-5" />
    </a>
    <a
      href="https://x.com/SparkBorders?t=jWB0XrsM4x_ps_0ScOU7aA&s=08"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-navy transition"
    >
      <Twitter className="w-5 h-5" />
    </a>
    <a
      href="https://www.instagram.com/sparkborders?igsh=MWdta3d6YzY5bXlhNQ=="
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-navy transition"
    >
      <Instagram className="w-5 h-5" />
    </a>
    <a
      href="https://www.linkedin.com/company/sparkborders/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-navy transition"
    >
      <Linkedin className="w-5 h-5" />
    </a>
  </div>
</div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="text-gray-500">
  &copy; {new Date().getFullYear()} Sparkborders. All Rights Reserved.
</p>

          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="/terms" className="hover:text-navy">Terms</a>
            <a href="/cookies" className="hover:text-navy">Cookies</a>
            <a href="/privacy" className="hover:text-navy">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
