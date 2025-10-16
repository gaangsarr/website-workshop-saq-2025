"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] bg-white overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            {/* Main Title dengan Text Stroke - Slide in dari kiri */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-2 text-stroke"
            >
              <h1 className="font-heading text-biru font-bold text-6xl md:text-7xl lg:text-8xl leading-none text-center md:text-left">
                WORKSHOP
              </h1>
              <h1 className="font-heading text-biru font-bold text-6xl md:text-7xl lg:text-8xl leading-none text-center md:text-left">
                SAQ 2025
              </h1>
            </motion.div>

            {/* Mobile Illustration - Fade in dengan delay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative -z-10 lg:hidden flex justify-center my-4"
            >
              <Image
                src="/aset-hero-kanan.png"
                width={350}
                height={350}
                alt="Workshop SAQ 2025 Illustration"
                className="w-3/4 max-w-xs h-auto object-contain"
                priority
              />
            </motion.div>

            {/* Subtitle - Fade in dari bawah */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="font-poppins font-bold text-2xl md:text-2xl text-pink text-stroke-mobile text-center md:text-left">
                Build Your First AI Agent
              </h2>
              <p className="font-poppins font-bold text-2xl md:text-2xl text-pink text-stroke-mobile text-center md:text-left">
                Automation for Personal & Freelance Finance with N8N
              </p>
            </motion.div>

            {/* Info Box - Fade in dengan bounce */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                type: "spring",
                bounce: 0.3,
              }}
              className="inline-block bg-[#EBEBEB] border-2 border-black rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg max-w-md w-full md:w-auto mx-auto md:mx-0"
            >
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="font-heading font-bold text-sm md:text-lg">
                    Date:
                  </span>
                  <span className="font-body text-sm md:text-lg">
                    Sabtu, 22 November 2025
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="font-heading font-bold text-sm md:text-lg">
                    Time:
                  </span>
                  <span className="font-body text-sm md:text-lg">
                    08:00 WIB - Selesai
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="font-heading font-bold text-sm md:text-lg">
                    Location:
                  </span>
                  <span className="font-body text-sm md:text-lg">
                    Ruang Pembangkit - ITPLN
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Ilustrasi Desktop dengan Floating Animation */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 hidden lg:block"
          >
            {/* Floating effect yang infinite */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/aset-hero-kanan.png"
                width={600}
                height={600}
                alt="Workshop SAQ 2025 Illustration"
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
