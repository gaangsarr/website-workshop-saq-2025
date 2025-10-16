"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Sambutan() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card1InView = useInView(card1Ref, { once: true, amount: 0.3 });
  const card2InView = useInView(card2Ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Card 1 - Kepala Lab (Biru) - Slide from Left */}
          <motion.div
            ref={card1Ref}
            initial={{ opacity: 0, x: -100 }}
            animate={card1InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[2.5rem] bg-biru overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='3' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden">
              {/* Content di atas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={card1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col text-center p-6 pb-4 space-y-4"
              >
                <h3 className="font-heading font-bold text-2xl text-kuning text-stroke-kuning leading-tight text-stroke-mobile">
                  Apa Kata Kepala Laboratorium SAQ?
                </h3>

                <div className="text-white text-sm text-justify leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>

                <div className="space-y-0.5 pt-2">
                  <p className="font-heading font-bold text-white text-base">
                    Dody, S.Kom., M.Kom.
                  </p>
                  <p className="font-body text-white text-sm">
                    Kepala Laboratorium Software Architecture & Quality
                  </p>
                </div>
              </motion.div>

              {/* Foto di bawah - nempel edge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={card1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative w-full flex justify-center"
              >
                <Image
                  src="/pak-dody-ws.png"
                  width={352}
                  height={448}
                  alt="Dody, S.Kom., M.Kom."
                  className="w-[280px] h-auto object-contain object-bottom"
                  priority
                />
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:flex-row items-end gap-0 p-0 pl-0">
              {/* Left - Photo (Nempel ke bawah) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={card1InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-auto h-full flex-shrink-0 flex justify-start self-end"
              >
                <Image
                  src="/pak-dod-ws-25.png"
                  width={352}
                  height={448}
                  alt="Dody, S.Kom., M.Kom."
                  className="w-[320px] lg:w-[420px] h-auto object-contain object-bottom rounded-none"
                  priority
                />
              </motion.div>

              {/* Right - Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={card1InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-1 flex flex-col justify-center space-y-6 text-left p-8 pb-12"
              >
                <h3 className="font-heading font-bold text-3xl lg:text-4xl text-kuning text-stroke-kuning leading-tight text-stroke">
                  Apa Kata Kepala Laboratorium SAQ?
                </h3>

                <div className="text-white text-base lg:text-lg text-justify leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="font-heading font-bold text-white text-lg lg:text-xl">
                    Dody, S.Kom., M.Kom.
                  </p>
                  <p className="font-body text-white text-sm lg:text-base">
                    Kepala Laboratorium Software Architecture & Quality
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Card 2 - Pemateri (Teal) - Slide from Right */}
          <motion.div
            ref={card2Ref}
            initial={{ opacity: 0, x: 100 }}
            animate={card2InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[2.5rem] bg-teal overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='3' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden">
              {/* Content di atas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={card2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col text-center p-6 pb-4 space-y-4"
              >
                <h3 className="font-heading font-bold text-2xl text-kuning text-stroke-kuning leading-tight text-stroke-mobile">
                  Apa Kata Pemateri?
                </h3>

                <div className="text-white text-sm text-justify leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>

                <div className="space-y-0.5 pt-2">
                  <p className="font-heading font-bold text-white text-base">
                    Nama Pemateri
                  </p>
                  <p className="font-body text-white text-sm">
                    Jabatan/Posisi Pemateri
                  </p>
                </div>
              </motion.div>

              {/* Foto di bawah - nempel edge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={card2InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative w-full flex justify-center"
              >
                <Image
                  src="/kak-cen-ws-25.png"
                  width={352}
                  height={448}
                  alt="Pemateri Workshop"
                  className="w-[280px] h-auto object-contain object-bottom"
                  priority
                />
              </motion.div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:flex-row-reverse items-end gap-0 p-0 pr-0">
              {/* Right - Photo (Nempel ke bawah) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={card2InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-auto h-full flex-shrink-0 flex justify-end self-end"
              >
                <Image
                  src="/kak-cen-ws-25.png"
                  width={352}
                  height={448}
                  alt="Pemateri Workshop"
                  className="w-[320px] lg:w-[420px] h-auto object-contain object-bottom rounded-none"
                  priority
                />
              </motion.div>

              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={card2InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-1 flex flex-col justify-center space-y-6 text-left p-8 pb-12"
              >
                <h3 className="font-heading font-bold text-3xl lg:text-4xl text-kuning text-stroke-kuning leading-tight text-stroke">
                  Apa Kata Pemateri?
                </h3>

                <div className="text-white text-base lg:text-lg text-justify leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris.
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="font-heading font-bold text-white text-lg lg:text-xl">
                    Nama Pemateri
                  </p>
                  <p className="font-body text-white text-sm lg:text-base">
                    Jabatan/Posisi Pemateri
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
