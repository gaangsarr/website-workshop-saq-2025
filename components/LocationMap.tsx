"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function LocationMap() {
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7933.442117309821!2d106.72547184930829!3d-6.168094985980087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f788f60e492d%3A0x8b5ed89a85136510!2sInstitut%20Teknologi%20PLN!5e0!3m2!1sid!2sid!4v1761489311810!5m2!1sid!2sid";

  const googleMapsUrl = "https://maps.app.goo.gl/NJjrhNDYCFvWjvfV9";

  const address =
    "Jl. Lingkar Luar Barat No.1, Duri Kosambi, Kec. Cengkareng, Jakarta Barat 11750";

  return (
    <section className="py-16 md:py-24 bg-white" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-kuning text-stroke text-stroke-mobile mb-4">
            Lokasi Workshop
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Institut Teknologi PLN, Jakarta Barat
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Map Embed */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-black shadow-2xl mb-6">
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-biru hover:bg-blue-700 text-white font-heading font-bold py-4 px-8 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl"
            >
              <Navigation className="w-5 h-5" />
              Buka di Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: "Lokasi Workshop SAQ 2025",
                      text: `Lokasi Workshop: ${address}`,
                      url: googleMapsUrl,
                    })
                    .catch((err) => console.log("Error sharing:", err));
                } else {
                  navigator.clipboard.writeText(googleMapsUrl);
                  alert("Link lokasi disalin!");
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-heading font-bold py-4 px-8 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-5 h-5" />
              Bagikan Lokasi
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
