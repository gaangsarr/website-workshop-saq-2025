"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Gamepad2, Trophy, BookOpen, Play } from "lucide-react";

export default function GamePromo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-teal rounded-[2.5rem] p-8 md:p-12 border-2 border-black"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="p-5 bg-kuning rounded-full border-2 border-black">
              <Gamepad2 className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-stroke-mobile text-stroke-desktop"
          >
            <span className="text-biru">Quiz </span>
            <span className="text-pink">Game </span>
            <span className="text-kuning">Challenge</span>
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link href="/game" className="w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-biru hover:bg-blue-700 text-white font-heading font-bold text-lg py-5 px-12 rounded-2xl transition-all flex items-center justify-center gap-3 border-2 border-black shadow-lg"
              >
                <Play className="w-6 h-6" />
                Main Sekarang
              </motion.button>
            </Link>
          </motion.div>

          {/* Bottom Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center text-gray-600 text-sm mt-6"
          >
            Cari Tahu Mengenai Materi Workshop!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
