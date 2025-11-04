"use client";
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container fluid>
        {/* ===== Left Section: Logo + Title ===== */}
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-circle"
          />
          <h1 className="h4 m-0 fw-bold text-light">TrendyCryptoVibe</h1>
        </Navbar.Brand>

        {/* ===== Hamburger Menu (Mobile) ===== */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* ===== Center + Right Sections ===== */}
        <Navbar.Collapse id="main-navbar">
          {/* Centered Nav Links */}
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} href="/" className="mx-2 text-light">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/dashboard" className="mx-2 text-light">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} href="/trading">
              Trading
            </Nav.Link>
            <Nav.Link as={Link} href="/predictions" className="mx-2 text-light">
              Predictions
            </Nav.Link>
            <Nav.Link as={Link} href="/about" className="mx-2 text-light">
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/contact" className="mx-2 text-light">
              Contact
            </Nav.Link>
          </Nav>

          {/* Right Side Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-3 mt-lg-0">
            <Button
              variant="outline-light"
              size="sm"
              as={Link}
              href="/login"
            >
              Login
            </Button>
            <Button
              variant="primary"
              size="sm"
              as={Link}
              href="/register"
            >
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
