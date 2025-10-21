"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function MengulikWS() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Fade in dari atas */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center text-3xl md:text-5xl font-heading font-bold mb-12 md:mb-16 text-kuning text-stroke-mobile text-stroke-desktop"
        >
          Mengulik Workshop <span className="text-biru">SAQ</span>{" "}
          <span className="text-kuning">2025</span>
        </motion.h2>

        {/* Content Box - Fade in + Scale dari bawah */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="rounded-[2.5rem] p-6 md:p-12 bg-[#EBEBEB]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='2' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="space-y-6 text-justify">
            {/* Paragraph 1 - Fade in */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg leading-relaxed"
            >
              <span className="font-heading font-bold">Workshop SAQ 2025</span>{" "}
              merupakan kegiatan tahunan yang diselenggarakan oleh Laboratorium
              Software Architecture and Quality (SAQ), Institut Teknologi PLN.
              Acara ini dirancang sebagai wadah kolaborasi dan pembelajaran bagi
              mahasiswa serta praktisi industri yang tertarik pada bidang
              arsitektur perangkat lunak, kualitas sistem, dan teknologi
              pengembangan modern.
            </motion.p>

            {/* Paragraph 2 - Fade in dengan delay */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base md:text-lg leading-relaxed"
            >
              Tahun 2025, Workshop Lab. SAQ mengangkat tema{" "}
              <span className="font-heading font-bold">
                "Build Your First AI Agent: Automation for Personal & Tech
                Freelancer"
              </span>{" "}
              sebagai bentuk eksplorasi integrasi antara kecerdasan buatan (AI)
              dan otomatisasi keuangan. Melalui tema ini, peserta diajak untuk
              membangun agen AI pertama mereka serta memanfaatkan platform n8n
              dalam menciptakan alur otomatisasi yang dapat membantu mengelola
              keuangan pribadi maupun freelance secara efisien. Workshop ini
              menjadi wadah bagi mahasiswa dan peserta untuk memahami bagaimana
              teknologi AI dan otomasi dapat diterapkan dalam kehidupan nyata.
              Mulai dari menghemat waktu, meningkatkan produktivitas, hingga
              mendukung pengambilan keputusan berbasis data dalam bidang
              finansial modern.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
