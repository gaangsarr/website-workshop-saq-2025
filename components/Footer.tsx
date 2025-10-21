import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-biru overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left - Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                width={65}
                height={65}
                alt="Workshop SAQ Logo"
                className="w-16 h-16"
              />
              <div className="flex flex-col group">
                <span className="font-heading font-bold text-xl leading-tight text-white">
                  Workshop
                </span>
                <div className="leading-tight">
                  <span className="font-heading font-bold text-xl text-white">
                    SAQ{" "}
                  </span>
                  <span className="font-heading font-bold text-xl text-white">
                    2025
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-white text-sm md:text-base leading-relaxed">
              Build Your First AI Agent: Automation for Personal & Tech
              Freelancer
            </p>
          </div>

          {/* Middle - Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-kuning">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#hero"
                  className="text-white hover:text-kuning transition-colors text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/game"
                  className="text-white hover:text-kuning transition-colors text-sm md:text-base"
                >
                  Game
                </Link>
              </li>
              <li>
                <Link
                  href="#register"
                  className="text-white hover:text-kuning transition-colors text-sm md:text-base"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-white hover:text-kuning transition-colors text-sm md:text-base"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl text-kuning">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white text-sm md:text-base">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>
                  Laboratorium Software Architecture and Quality, Institut
                  Teknologi PLN, Jakarta
                </span>
              </li>
              <li className="flex items-center gap-3 text-white text-sm md:text-base">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:lablanjut@itpln.ac.id"
                  className="hover:text-kuning transition-colors"
                >
                  lablanjut@itpln.ac.id
                </a>
              </li>
              <li className="flex items-center gap-3 text-white text-sm md:text-base">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://wa.me/6281333529018"
                  className="hover:text-kuning transition-colors"
                >
                  +62 813-3352-9018 (Megan)
                </a>
              </li>
              <li className="flex items-center gap-3 text-white text-sm md:text-base">
                <Instagram className="w-5 h-5 flex-shrink-0" />
                <a
                  href="https://instagram.com/saqlab.itpln"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kuning transition-colors"
                >
                  @saqlab.itpln
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider dengan Dashed Border */}
        <div className="my-8 md:my-12 h-px relative">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, white 0, white 15px, transparent 15px, transparent 25px)",
              height: "2px",
            }}
          ></div>
        </div>

        {/* Bottom - Copyright */}
        <div className="text-center space-y-2">
          <p className="text-white text-sm md:text-base">
            © 2025 Laboratorium Software Architecture & Quality
          </p>
          <p className="text-white/80 text-xs md:text-sm">
            Institut Teknologi PLN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
