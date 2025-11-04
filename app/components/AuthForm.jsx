'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";



export default function AuthForm({ type = "login" }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    terms: false
  });
  const { login } = useAuth();

  const router = useRouter();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "register") {
      if (!form.terms) {
        alert("⚠️ You must agree to the Terms & Conditions");
        return;
      }

      console.log("Registering:", form);
      alert("✅ Registration successful!");
      router.push("/login");
    } else {
      // Mock login check
      const correctEmail = "user@example.com";
      const correctPassword = "123456";

      if (form.email === correctEmail && form.password === correctPassword) {
        alert("✅ Login successful!");
        login(form.email, form.username || "User");
      } else {
        alert("❌ Incorrect email or password.");
      }

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        {type === "register" ? "Register" : "Login"}
      </h2>

      {type === "register" && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full mb-2 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {type === "login" && (
        <div className="flex justify-end mb-6">
          <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
      )}

      {type === "register" && (
        <label className="flex items-center text-gray-300 text-sm w-full text-left leading-tight mb-6">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="accent-blue-500 mr-3 mt-[2px]"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
          </span>
        </label>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
      >
        {type === "register" ? "Register" : "Login"}
      </button>

      <p className="text-gray-400 text-center mt-6">
        {type === "register" ? (
          <>
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </>
        )}
      </p>
    </form>
  );
}
