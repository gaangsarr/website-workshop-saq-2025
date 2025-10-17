"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface PartnerCard {
  name: string;
  logo: string;
  url: string;
}

export default function SpecialThanks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const partners: PartnerCard[] = [
    {
      name: "Institut Teknologi PLN",
      logo: "/ITPLN.png",
      url: "https://itpln.ac.id",
    },
    {
      name: "Fakultas Telematika Energi",
      logo: "/FTEN.png",
      url: "https://ften.itpln.ac.id/",
    },
    {
      name: "Asisten Laboratorium Komputer",
      logo: "/ASLABKOM.png",
      url: "https://www.instagram.com/aslabkom_itpln",
    },
    {
      name: "Laboratorium Software Architecture & Quality",
      logo: "/SAQ.png",
      url: "https://www.instagram.com/saqlab.itpln",
    },
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Fade in */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-kuning text-stroke-mobile text-stroke-desktop mb-12 md:mb-16"
        >
          Special Thanks
        </motion.h2>

        {/* Cards Grid - 4 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-[2rem] p-6 flex flex-col items-center transition-transform duration-300 cursor-pointer"
            >
              {/* Logo Container - Fixed Height */}
              <div className="flex items-center justify-center h-32 md:h-40 mb-4">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <Image
                    src={partner.logo}
                    width={128}
                    height={128}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Name - Always Same Position */}
              <h3 className="font-heading font-bold text-sm md:text-base text-center text-biru leading-tight">
                {partner.name}
              </h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
