"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import faqData from "@/data/faq.json";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Question Button with Border */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
        {isOpen ? (
          <ChevronUp className="w-6 h-6 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-6 h-6 flex-shrink-0" />
        )}
      </button>

      {/* Answer Section with Animation and Border */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="relative bg-biru text-white rounded-2xl px-6 py-6 text-justify leading-relaxed text-sm md:text-base overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='black' stroke-width='2' stroke-dasharray='10, 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-kuning text-stroke-mobile text-stroke-desktop mb-12 md:mb-16">
          FAQ
        </h2>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqData.map((item: FAQItem) => (
            <FAQAccordion key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
