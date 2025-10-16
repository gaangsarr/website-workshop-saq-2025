export default function MengulikWS() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl md:text-5xl font-heading font-bold mb-12 md:mb-16 text-kuning text-stroke-mobile text-stroke-desktop">
          Mengulik Workshop <span className="text-biru">SAQ</span>{" "}
          <span className="text-kuning">2025</span>
        </h2>

        {/* Content Box with Dashed Border */}
        <div
          className="rounded-[2.5rem] p-6 md:p-12 bg-[#EBEBEB]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='black' stroke-width='2' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="space-y-6 text-justify">
            <p className="text-base md:text-lg leading-relaxed">
              <span className="font-heading font-bold">Workshop SAQ 2025</span>{" "}
              merupakan kegiatan tahunan yang diselenggarakan oleh Laboratorium
              Software Architecture and Quality (SAQ), Institut Teknologi PLN.
              Acara ini dirancang sebagai wadah kolaborasi dan pembelajaran bagi
              mahasiswa serta praktisi industri yang tertarik pada bidang
              arsitektur perangkat lunak, kualitas sistem, dan teknologi
              pengembangan modern.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
              Tahun 2025, Workshop Lab. SAQ mengangkat tema{" "}
              <span className="font-heading font-bold">
                "Build Your First AI Agent: Automation for Personal & Freelance
                Finance with n8n"
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
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
