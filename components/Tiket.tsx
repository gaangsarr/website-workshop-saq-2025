"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TiketCardProps {
  title: string;
  originalPrice: string;
  discountPrice: string;
  quota: string;
  type: "pre-sale" | "normal";
  route: string;
  index: number;
}

function TiketCard({
  title,
  originalPrice,
  discountPrice,
  quota,
  type,
  route,
  index,
}: TiketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: type === "pre-sale" ? 1 : 0 }}
      className="relative rounded-[2rem] bg-biru overflow-hidden border-2"
    >
      {/* Badge Pre-Sale atau Normal */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: index * 0.1 + 0.3,
          type: "spring",
          bounce: 0.5,
        }}
        className="absolute top-4 right-4 z-10"
      >
        <span
          className={`font-heading font-bold text-sm px-6 py-2 rounded-full ${
            type === "pre-sale"
              ? "bg-merah text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          {type === "pre-sale" ? "Pre-Sale" : "Normal"}
        </span>
      </motion.div>

      <div className="p-6 space-y-4">
        {/* Title */}
        <h4 className="font-heading font-bold text-2xl md:text-3xl text-white">
          {title}
        </h4>

        {/* Original Price (Strikethrough) */}
        <p className="text-white text-sm md:text-base line-through opacity-80">
          Rp {originalPrice}
        </p>

        {/* Discount Price (Large Yellow) */}
        <p className="font-heading font-bold text-3xl md:text-4xl text-kuning text-stroke-tipis">
          Rp {discountPrice}
        </p>

        {/* Quota */}
        <p className="text-white text-sm md:text-base">{quota}</p>

        {/* Button Daftar */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={route}
            className={`block text-center font-heading font-bold text-lg py-3 rounded-2xl transition-all ${
              type === "pre-sale"
                ? "bg-pink text-white hover:bg-[#D93D7B] shadow-lg hover:shadow-xl"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Daftar
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Tiket() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="register"
      ref={ref}
      className="relative py-16 md:py-24 bg-hijau"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Fade in dari atas */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-kuning text-stroke-mobile mb-12 md:mb-16 text-stroke-desktop"
        >
          Pilihan Paket
        </motion.h2>

        {/* Cards Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {/* Paket Mandiri */}
          <TiketCard
            title="Paket Mandiri"
            originalPrice="55.000,00"
            discountPrice="45.000,00"
            quota="Untuk 1 Orang Peserta"
            type="pre-sale"
            route="/daftar/mandiri"
            index={0}
          />

          {/* Paket Bertiga */}
          <TiketCard
            title="Paket Bertiga"
            originalPrice="135.000,00"
            discountPrice="120.000,00"
            quota="Untuk 3 Orang Peserta"
            type="pre-sale"
            route="/daftar/bertiga"
            index={1}
          />

          {/* Paket Berlima - NEW */}
          <TiketCard
            title="Paket Berlima"
            originalPrice="225.000,00"
            discountPrice="200.000,00"
            quota="Untuk 5 Orang Peserta"
            type="pre-sale"
            route="/daftar/berlima"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
