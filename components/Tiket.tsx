"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTicketConfig } from "@/hooks/useTicketConfig";
import { Clock } from "lucide-react";
import TiketCard from "./TiketCard";

export default function Tiket() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { config, isSalesOpen } = useTicketConfig();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 bg-teal overflow-hidden"
      id="register"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-kuning text-stroke-mobile text-stroke mb-4">
            Pilihan Paket
          </h2>

          {/* Status Banner - Only render on client after mount */}
          {isMounted && (
            <>
              {!isSalesOpen() && (
                <div className="inline-flex items-center gap-3 bg-yellow-100 border-2 border-yellow-400 text-yellow-800 px-6 py-3 rounded-2xl mt-4">
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
            </>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="flex justify-center max-w-4xl mx-auto">
          {isMounted && <TiketCard packageId="mandiri" index={0} />}
        </div>
      </div>
    </section>
  );
}
