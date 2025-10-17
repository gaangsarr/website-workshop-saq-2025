"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Detect active section with Intersection Observer (only on homepage)
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-lg shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section with Unified Hover Animation */}
          <motion.div whileHover="hover" className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={closeMenu}
            >
              {/* Animated Logo */}
              <motion.div
                variants={{
                  hover: { rotate: 360, scale: 1.1 },
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Image
                  src="/logo.png"
                  width={65}
                  height={65}
                  alt="Workshop SAQ Logo"
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </motion.div>
              <div className="flex flex-col group">
                <span className="font-heading font-bold text-lg leading-tight transition-colors md:text-2xl group-hover:text-kuning">
                  Workshop
                </span>
                <div className="leading-tight">
                  <span className="font-heading font-bold text-lg transition-colors md:text-2xl group-hover:text-biru">
                    SAQ{" "}
                  </span>
                  <span className="font-heading font-bold text-lg transition-colors md:text-2xl group-hover:text-pink">
                    2025
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/#hero"
              className={`font-heading text-lg hover:text-biru transition-colors ${
                pathname === "/" &&
                (activeSection === "home" || activeSection === "hero")
                  ? "font-bold text-biru"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/#register"
              className={`font-heading text-lg hover:text-kuning transition-colors ${
                pathname === "/" && activeSection === "register"
                  ? "font-bold text-kuning"
                  : ""
              }`}
            >
              Register
            </Link>
            <Link
              href="/game"
              className={`font-heading text-lg hover:text-teal transition-colors ${
                pathname === "/game" ? "font-bold text-teal" : ""
              }`}
            >
              Game
            </Link>
            <Link
              href="/#faq"
              className={`font-heading text-lg hover:text-pink transition-colors ${
                pathname === "/" && activeSection === "faq"
                  ? "font-bold text-pink"
                  : ""
              }`}
            >
              FAQ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-[60]"
            aria-label="Toggle menu"
          >
            {/* Hamburger Icon with Animation */}
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-6 bg-black transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-black transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out relative z-[55] ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 bg-white rounded-lg mb-4 shadow-lg">
            <Link
              href="/#hero"
              onClick={closeMenu}
              className={`block font-heading text-lg px-6 py-3 hover:bg-biru hover:text-white transition-all rounded-lg mx-2 ${
                pathname === "/" &&
                (activeSection === "home" || activeSection === "hero")
                  ? "font-bold bg-biru text-white"
                  : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/#register"
              onClick={closeMenu}
              className={`block font-heading text-lg px-6 py-3 hover:bg-pink hover:text-white transition-all rounded-lg mx-2 ${
                pathname === "/" && activeSection === "register"
                  ? "font-bold bg-pink text-white"
                  : ""
              }`}
            >
              Register
            </Link>
            <Link
              href="/game"
              onClick={closeMenu}
              className={`block font-heading text-lg px-6 py-3 hover:bg-teal hover:text-white transition-all rounded-lg mx-2 ${
                pathname === "/game" ? "font-bold bg-teal text-white" : ""
              }`}
            >
              Game
            </Link>
            <Link
              href="/#faq"
              onClick={closeMenu}
              className={`block font-heading text-lg px-6 py-3 hover:bg-kuning hover:text-white transition-all rounded-lg mx-2 ${
                pathname === "/" && activeSection === "faq"
                  ? "font-bold bg-kuning text-white"
                  : ""
              }`}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay untuk close menu saat click di luar */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
}
