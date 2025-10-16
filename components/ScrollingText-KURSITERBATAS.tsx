"use client";

import { motion } from "framer-motion";

export default function ScrollingText() {
  return (
    <section className="relative py-8 md:py-12 bg-teal overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          },
        }}
      >
        {/* First Copy */}
        <div className="flex items-center shrink-0">
          {[...Array(5)].map((_, i) => (
            <div key={`first-${i}`} className="flex items-center">
              <h2 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl px-8">
                <span className="text-merah text-stroke-desktop text-stroke">
                  KURSI{" "}
                </span>
                <span className="text-merah text-stroke-desktop text-stroke">
                  TERBATAS{" "}
                </span>
              </h2>
              <span className="text-white text-6xl md:text-8xl mx-8 font-extrabold">
                -
              </span>
            </div>
          ))}
        </div>

        {/* Second Copy (Exact Duplicate) */}
        <div className="flex items-center shrink-0">
          {[...Array(5)].map((_, i) => (
            <div key={`first-${i}`} className="flex items-center">
              <h2 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl px-8">
                <span className="text-merah text-stroke-desktop text-stroke">
                  KURSI{" "}
                </span>
                <span className="text-merah text-stroke-desktop text-stroke">
                  TERBATAS{" "}
                </span>
              </h2>
              <span className="text-white text-6xl md:text-8xl mx-8 font-extrabold">
                -
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
