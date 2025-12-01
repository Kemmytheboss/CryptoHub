"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Community", href: "/community" },
    { name: "Trading", href: "/trading" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        
        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/bit.gif" width={40} height={40} alt="logo" />
          <h1 className="text-xl font-bold text-purple-600">TrendyCryptoVibe</h1>
        </Link>

        {/* CENTER — DESKTOP LINKS */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          {links.map((l) => (
            <li key={l.name}>
              <Link
                href={l.href}
                className="hover:text-purple-600 transition"
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT — AUTH BUTTONS */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="px-4 py-2 text-purple-600 hover:text-purple-800">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="block text-gray-700 text-lg"
              onClick={() => setOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          <hr />

          <Link href="/login" className="block text-purple-600">
            Login
          </Link>
          <Link
            href="/register"
            className="block bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
