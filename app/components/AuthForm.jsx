'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function AuthForm({ type = "login" }) {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") updatePasswordStrength(value);
  };

  // ✅ Password strength logic
  const updatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&_.]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.])[A-Za-z\d@$!%*?&_.]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "register") {
      if (!validatePassword(form.password)) {
        alert(
          "❌ Password must have at least:\n- 6 characters\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character"
        );
        return;
      }

      if (form.password !== form.confirmPassword) {
        alert("❌ Passwords do not match!");
        return;
      }

      if (!form.terms) {
        alert("⚠️ You must agree to the Terms & Conditions");
        return;
      }

      alert("✅ Registration successful!");
      router.push("/");
    } else {
      const correctUsername = "verahm";
      const correctPassword = "123456";

      if (form.username === correctUsername && form.password === correctPassword) {
        alert("✅ Login successful!");
        login(form.username || "User");
      } else {
        alert("❌ Incorrect username or password.");
      }
    }
  };

  // Password strength bar colors
  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength >= 4) return "bg-green-500";
  };

  const strengthLabels = ["Weak", "Weak", "Fair", "Good", "Strong"];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        {type === "register" ? "Register" : "Login"}
      </h2>

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Username (register only) */}
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

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full mb-2 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password strength meter */}
      {type === "register" && (
        <div className="w-full h-2 bg-gray-600 rounded mb-2">
          <div
            className={`h-2 rounded transition-all ${getStrengthColor()}`}
            style={{ width: `${(passwordStrength / 5) * 100}%` }}
          ></div>
          <p className="text-gray-400 text-sm mt-1">
            Strength: {strengthLabels[passwordStrength - 1] || "Very Weak"}
          </p>
        </div>
      )}

      {/* Confirm Password (register only) */}
      {type === "register" && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full mb-2 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {/* Forgot password link */}
      {type === "login" && (
        <div className="flex justify-end mb-6">
          <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
      )}

      {/* Terms checkbox (register only) */}
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

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
      >
        {type === "register" ? "Register" : "Login"}
      </button>

      {/* Switch between forms */}
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
