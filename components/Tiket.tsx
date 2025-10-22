"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTicketConfig } from "@/hooks/useTicketConfig";
import { Clock, AlertCircle } from "lucide-react";

interface TiketCardProps {
  packageId: "mandiri" | "bertiga";
  index: number;
}

function TiketCard({ packageId, index }: TiketCardProps) {
  const { getActivePackage, formatPrice, isSalesOpen } = useTicketConfig();
  const pkg = getActivePackage(packageId);

  if (!pkg) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative"
    >
      {/* Badge */}
      {pkg.isPreSale && (
        <div className="absolute -top-3 -right-3 z-10">
          <div className="bg-merah text-white px-4 py-2 rounded-full text-xs font-heading font-bold border-2 border-black shadow-lg flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pre-Sale
          </div>
        </div>
      )}

      {pkg.badge && !pkg.isPreSale && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-kuning text-white px-4 py-1 rounded-full text-sm font-heading font-bold border-2 border-black shadow-lg">
            {pkg.badge}
          </div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-3xl border-2 border-black overflow-hidden shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className={`${pkg.color} p-6 text-center text-white`}>
          <h3 className="font-heading font-bold text-2xl mb-2">{pkg.name}</h3>
          <p className="text-white/90 text-sm mb-4">{pkg.participants}</p>

          {/* Price */}
          <div className="border-t-2 border-white/20 pt-4">
            {pkg.isPreSale && pkg.originalPrice !== pkg.currentPrice && (
              <p className="text-white/70 line-through text-sm mb-1">
                {formatPrice(pkg.originalPrice)}
              </p>
            )}
            <p className="font-heading font-bold text-4xl">
              {formatPrice(pkg.currentPrice)}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex-1 p-6">
          <ul className="space-y-2">
            {pkg.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-green-600 mt-0.5">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <div className="p-6 pt-0">
          <Link href={`/daftar/${packageId}`} className="block w-full">
            <button
              disabled={!isSalesOpen()}
              className={`w-full ${pkg.color} ${pkg.hoverColor} text-white font-heading font-bold py-4 px-6 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSalesOpen() ? "Daftar Sekarang" : "Ditutup"}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tiket() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { config, isSalesOpen } = useTicketConfig();

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 bg-white overflow-hidden min-h-screen flex items-center"
      id="register"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-biru mb-4 text-stroke-mobile md:text-stroke">
            Pilihan Paket
          </h2>

          {/* Status Banner */}
          {!isSalesOpen() && (
            <div className="inline-flex items-center gap-3 bg-merah border-2 text-black px-6 py-3 rounded-2xl mt-4">
              <AlertCircle className="w-5 h-5" />
              <p className="font-heading font-bold">
                {config.salesStatus.closedMessage}
              </p>
            </div>
          )}

          {config.salesStatus.isPreSaleOpen && (
            <div className="inline-flex items-center gap-3 bg-merah/10 border-2 border-merah text-merah px-6 py-3 rounded-2xl mt-4">
              <Clock className="w-5 h-5" />
              <p className="font-heading font-bold">
                Pre-Sale - Kuota Terbatas!
              </p>
            </div>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TiketCard packageId="mandiri" index={0} />
          <TiketCard packageId="bertiga" index={1} />
        </div>
      </div>
    </section>
  );
}
