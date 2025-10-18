"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Sambutan() {
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card1InView = useInView(card1Ref, { once: true, amount: 0.3 });
  const card2InView = useInView(card2Ref, { once: true, amount: 0.3 });

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {" "}
      {/* ← Add overflow-hidden */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Card 1 - Kepala Lab (Biru) */}
          <motion.div
            ref={card1Ref}
            initial={{ opacity: 0, x: -50 }}
            animate={card1InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[2.5rem] bg-biru overflow-hidden border-2 border-black"
          >
            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden">
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

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={card1InView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative w-full flex justify-center"
              >
                <Image
                  src="/pak-dod-ws-25-revisi.png"
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
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={card1InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-auto h-full flex-shrink-0 flex justify-start self-end"
              >
                <Image
                  src="/pak-dod-ws-25-revisi.png"
                  width={352}
                  height={448}
                  alt="Dody, S.Kom., M.Kom."
                  className="w-[320px] lg:w-[420px] h-auto object-contain object-bottom rounded-none"
                  priority
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
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

          {/* Card 2 - Pemateri (Teal) */}
          <motion.div
            ref={card2Ref}
            initial={{ opacity: 0, x: 50 }}
            animate={card2InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[2.5rem] bg-teal overflow-hidden border-2 border-black"
          >
            {/* Mobile Layout */}
            <div className="flex flex-col md:hidden">
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
                    "Freelancer zaman dulu kerja sendirian. Freelancer zaman
                    sekarang kerja bareng AI." Kalau kamu anak tech dan pengen
                    mulai cari cuan, kamu nggak perlu nunggu lulus dulu. Tapi
                    jangan juga mulai dengan cara lama. Belajar automation pakai
                    n8n, dan jadi freelancer generasi baru yang kerja sekali,
                    hasilnya jalan otomatis berkali-kali.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="font-heading font-bold text-white text-base">
                    Cendekia Luthfieta Nazalia
                  </p>
                  <p className="font-body text-white text-sm">
                    Technician Perencanaan SCADA - PLN Icon Plus
                  </p>

                  {/* Social Media Links - Mobile */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <a
                      href="https://www.instagram.com/luthfieta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.youtube.com/@luthfieta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                      aria-label="Instagram"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://tiktok.com/@luthfieta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/cendekialnazalia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </motion.div>

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
              <motion.div
                initial={{ opacity: 0, x: 30 }}
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

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={card2InView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-1 flex flex-col justify-center space-y-6 text-left p-8 pb-12"
              >
                <h3 className="font-heading font-bold text-3xl lg:text-4xl text-kuning text-stroke-kuning leading-tight text-stroke">
                  Apa Kata Pemateri?
                </h3>

                <div className="text-white text-base lg:text-lg text-justify leading-relaxed">
                  <p>
                    "Freelancer zaman dulu kerja sendirian. Freelancer zaman
                    sekarang kerja bareng AI." Kalau kamu anak tech dan pengen
                    mulai cari cuan, kamu nggak perlu nunggu lulus dulu. Tapi
                    jangan juga mulai dengan cara lama. Belajar automation pakai
                    n8n, dan jadi freelancer generasi baru yang kerja sekali,
                    hasilnya jalan otomatis berkali-kali.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="font-heading font-bold text-white text-lg lg:text-xl">
                    Cendekia Luthfieta Nazalia
                  </p>
                  <p className="font-body text-white text-sm lg:text-base">
                    Technician Perencanaan SCADA
                  </p>

                  {/* Social Media Links - Desktop */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="https://www.instagram.com/luthfieta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.youtube.com/@luthfieta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                      aria-label="Instagram"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://tiktok.com/@luthfieta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110"
                      aria-label="TikTok"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/cendekialnazalia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-white/20 hover:bg-white/30 rounded-full transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
