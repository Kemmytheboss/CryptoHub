'use client';
import React from 'react';
import { Button, Container } from 'react-bootstrap';

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-800 text-white">
      <Container className="text-center py-10">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-wide">
          TrendyCryptoVibe
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl mx-auto">
          Stay updated with the latest crypto trends 🚀 — live insights, feeds, and vibes.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Button
            className="btn-primary px-5 py-3 text-lg rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Live Dashboard
          </Button>

          <Button
            variant="outline-light"
            className="px-5 py-3 text-lg rounded-xl border-2 hover:bg-white hover:text-blue-600 transition-colors"
          >
            Social Feed
          </Button>
        </div>
      </Container>
    </section>
  );
}
