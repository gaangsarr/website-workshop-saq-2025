"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface PartnerCard {
  name: string;
  logo: string;
  description: string;
}

export default function SpecialThanks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const partners: PartnerCard[] = [
    {
      name: "Institut Teknologi PLN",
      logo: "/ITPLN.png",
      description: "Kampus",
    },
    {
      name: "Fakultas Telematika Energi",
      logo: "/FTEN.png",
      description: "Fakultas",
    },
    {
      name: "Asisten Laboratorium Komputer",
      logo: "/ASLABKOM.png",
      description: "Aslabkom",
    },
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-white">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Fade in */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-kuning text-stroke-mobile text-stroke-desktop mb-12 md:mb-16"
        >
          Special Thanks
        </motion.h2>

        {/* Cards Grid - Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center space-y-6 transition-transform duration-300"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='3' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                minHeight: "280px",
              }}
            >
              {/* Logo */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  width={160}
                  height={160}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Name */}
              <div className="text-center space-y-2">
                <h3 className="font-heading font-bold text-lg md:text-xl text-biru">
                  {partner.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {partner.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
