'use client';

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("⚠️ Please enter your email address.");
      return;
    }

    // Here you'd call your backend API to send the reset link
    console.log("Sending reset link to:", email);
    alert("✅ Password reset link sent to your email!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Reset Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
        >
          Send Reset Link
        </button>

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
