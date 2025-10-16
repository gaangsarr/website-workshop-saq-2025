"use client";

import { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import faqData from "@/data/faq.json";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      {/* Question Button with Border */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full bg-biru text-white rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-biru/90 transition-all overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='black' stroke-width='2' stroke-dasharray='10, 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <span className="font-heading text-base md:text-lg text-left pr-4">
          {item.question}
        </span>

        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 flex-shrink-0" />
        </motion.div>
      </motion.button>

      {/* Answer Section with Animation and Border */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative bg-biru text-white rounded-2xl px-6 py-6 text-justify leading-relaxed text-sm md:text-base overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='black' stroke-width='2' stroke-dasharray='10, 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          {item.answer}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="faq" ref={ref} className="relative py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title - Fade in dari atas */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-kuning text-stroke-mobile text-stroke-desktop mb-12 md:mb-16"
        >
          FAQ
        </motion.h2>

        {/* FAQ Items - Stagger Animation */}
        <div className="space-y-0">
          {faqData.map((item: FAQItem, index: number) => (
            <FAQAccordion key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
