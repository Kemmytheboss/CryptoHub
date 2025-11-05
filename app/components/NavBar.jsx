"use client";
import React from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./AuthProvider"; 

export default function AppNavbar() {
  const { user, logout } = useAuth(); 

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container fluid>
        {/* Left Section: Logo + Title */}
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

        {/* Hamburger Menu (Mobile)  */}
        <Navbar.Toggle aria-controls="main-navbar" />

        {/* Center + Right Sections */}
        <Navbar.Collapse id="main-navbar">
          {/* Centered Nav Links */}
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} href="/" className="mx-2 text-light">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/trading" className="mx-2 text-light">
              Trading
            </Nav.Link>
            <Nav.Link as={Link} href="/about" className="mx-2 text-light">
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/contact" className="mx-2 text-light">
              Contact
            </Nav.Link>
          </Nav>

          {/* Right Section (Auth Buttons or User Menu) */}
          <div className="d-flex justify-content-end gap-2 mt-3 mt-lg-0">
            {!user ? (
              <>
                <Button variant="outline-light" size="sm" as={Link} href="/login">
                  Login
                </Button>
                <Button variant="primary" size="sm" as={Link} href="/register">
                  Register
                </Button>
              </>
            ) : (
              <NavDropdown
                title={
                  <span className="text-light">
                    👋 {user.username || "User"}
                  </span>
                }
                align="end"
              >
                <NavDropdown.Item as={Link} href="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} className="text-danger">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
