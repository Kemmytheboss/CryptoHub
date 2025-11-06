'use client';
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center flex flex-col items-center">
        {/* Social icons */}
        <div className="flex justify-center gap-8 mb-4">
          <a
            href="https://twitter.com"
            target="_blank"
            className="text-[#00FFF0] text-3xl hover:text-[#FF00FF] hover:drop-shadow-[0_0_20px_#FF00FF] transition-all duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            className="text-[#00FFF0] text-3xl hover:text-[#FF00FF] hover:drop-shadow-[0_0_20px_#FF00FF] transition-all duration-300"
          >
            <FaDiscord />
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            className="text-[#00FFF0] text-3xl hover:text-[#FF00FF] hover:drop-shadow-[0_0_20px_#FF00FF] transition-all duration-300"
          >
            <FaTelegram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TrendyCryptoVibe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
