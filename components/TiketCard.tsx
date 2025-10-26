"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTicketConfig } from "@/hooks/useTicketConfig";
import { Clock } from "lucide-react";

interface TiketCardProps {
  packageId: "mandiri" | "bertiga";
  index: number;
}

export default function TiketCard({ packageId, index }: TiketCardProps) {
  const { getActivePackage, formatPrice, isSalesOpen } = useTicketConfig();
  const [pkg, setPkg] = useState<ReturnType<typeof getActivePackage>>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setPkg(getActivePackage(packageId));
  }, [packageId, getActivePackage]);

  if (!pkg || !isMounted) return null;

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
