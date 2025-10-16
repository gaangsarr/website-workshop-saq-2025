import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] bg-white overflow-hidden flex items-center">
      {/* Background Circle Decoration - Kiri Bawah
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 blur-xs -translate-x-1/2 translate-y-1/2 z-0">
        <Image
          src="/koin-saq.png"
          width={600}
          height={600}
          alt="Workshop SAQ 2025 Illustration"
        />
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-10">
            {/* Main Title dengan Text Stroke */}
            <div className="space-y-2 text-stroke">
              <h1 className="font-heading text-biru font-bold text-6xl md:text-7xl lg:text-8xl leading-none text-center md:text-left">
                WORKSHOP
              </h1>
              <h1 className="font-heading text-biru font-bold text-6xl md:text-7xl lg:text-8xl leading-none text-center md:text-left">
                SAQ 2025
              </h1>
            </div>

            {/* Subtitle */}
            <div>
              <h2 className="font-poppins font-bold text-2xl md:text-2xl text-pink text-stroke-mobile text-center md:text-left">
                Build Your First AI Agent
              </h2>
              <p className="font-poppins font-bold text-2xl md:text-2xl text-pink text-stroke-mobile text-center md:text-left">
                Automation for Personal & Freelance Finance with N8N
              </p>
            </div>

            {/* Info Box */}
            <div className="inline-block bg-[#EBEBEB] border-2 border-black rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg max-w-md w-full md:w-auto">
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="font-heading font-bold text-sm md:text-lg">
                    Date:
                  </span>
                  <span className="font-body text-sm md:text-lg">
                    Sabtu, 22 November 2025
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="font-heading font-bold text-sm md:text-lg">
                    Time:
                  </span>
                  <span className="font-body text-sm md:text-lg">
                    08:00 WIB - Selesai
                  </span>
                </div>
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="font-heading font-bold text-sm md:text-lg">
                    Location:
                  </span>
                  <span className="font-body text-sm md:text-lg">
                    Ruang Pembangkit - ITPLN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative z-10 hidden lg:block">
            <Image
              src="/aset-hero-kanan.png"
              width={600}
              height={600}
              alt="Workshop SAQ 2025 Illustration"
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
