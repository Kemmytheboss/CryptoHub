'use client';

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setResetLink("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ A reset link has been sent to your email (mock).");
        // Generate a fake reset token for demonstration
        const token = Math.random().toString(36).substring(2, 10);
        setResetLink(`/reset-password/${token}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 rounded transition-colors ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && <p className="text-center mt-4 text-gray-300">{message}</p>}

        {resetLink && (
          <p className="text-center mt-4 text-green-400">
            👉 Mock reset link:{" "}
            <a
              href={resetLink}
              className="text-blue-400 underline hover:text-blue-300"
            >
              {resetLink}
            </a>
          </p>
        )}

        <p className="text-gray-400 text-center mt-6">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
}
