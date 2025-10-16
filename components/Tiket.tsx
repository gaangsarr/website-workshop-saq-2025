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
      className="relative rounded-[2rem] bg-biru overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='3' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
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
    <section ref={ref} className="relative py-16 md:py-24 bg-hijau">
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

        {/* Cards Grid - Stagger Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Pre-Sale Mandiri */}
          <TiketCard
            title="Paket Mandiri"
            originalPrice="55.000,00"
            discountPrice="45.000,00"
            quota="Untuk 1 Orang Peserta"
            type="pre-sale"
            route="/daftar/mandiri"
            index={0}
          />

          {/* Pre-Sale Bertiga */}
          <TiketCard
            title="Paket Bertiga"
            originalPrice="135.000,00"
            discountPrice="120.000,00"
            quota="Untuk 3 Orang Peserta"
            type="pre-sale"
            route="/daftar/bertiga"
            index={1}
          />

          {/* Normal Mandiri */}
          <TiketCard
            title="Paket Mandiri"
            originalPrice="XX.000,00"
            discountPrice="XX.000,00"
            quota="Untuk 1 Orang Peserta"
            type="normal"
            route="/daftar/mandiri"
            index={2}
          />

          {/* Normal Bertiga */}
          <TiketCard
            title="Paket Bertiga"
            originalPrice="XXX.000,00"
            discountPrice="XXX.000,00"
            quota="Untuk 3 Orang Peserta"
            type="normal"
            route="/daftar/bertiga"
            index={3}
          />
        </div>

        {/* Kursi Terbatas Text - Pulse Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.p
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-merah text-stroke-mobile text-stroke-desktop"
          >
            KURSI TERBATAS!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
