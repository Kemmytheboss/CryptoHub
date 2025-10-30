"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });  
  };
    return (
        <section className="p-8 bg-white/5 mt-8 rounded-xl max-w-3xl mx-auto">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-semibold mb-2">Contact Us</h2>
                <p className="text-gray-400">Have questions or want to collaborate? Send us a message!.</p>
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col gap-4"
                >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}