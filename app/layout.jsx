import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "TrendyCryptoVibe",
  description: "Stay ahead with real-time crypto trends and AI insights.",
};

export default function RootLayout({
  children}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-900 to-blue-800 text-white min-h-screen flex flex-col">
        <NavBar />
        <main className="min-h-screen bg-gradient-to-br from-[#4B0082] via-[#2F2FA2] to-[#00C2FF] text-white">
          {children}
        </main>
        <Footer />
        {/* Ensure the footer is always at the bottom */}
        <div className="h-16"></div>
        {/* This div ensures that the footer stays at the bottom of the page */}
      </body>
    </html>
  );
}
