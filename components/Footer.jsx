'use client';
import { FaTwitter, FaDiscord, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex justify-center gap-8 mt-10">
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
        <p className="text-gray-400 text-sm text-center">
          &copy; {new Date().getFullYear()} TrendyCryptoVibe. All rights reserved.
        </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;