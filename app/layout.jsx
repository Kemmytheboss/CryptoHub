"use client";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "./globals.css";
import {AuthProvider} from "./components/AuthContext";


export default function RootLayout({ children}) {
   useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <AuthProvider>
          <NavBar />
          <main className="flex-grow-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
