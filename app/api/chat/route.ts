import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "API key belum dikonfigurasi." },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // ✅ Updated: gemini-2.0-flash-exp (Latest model)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const prompt = `
Kamu adalah asisten virtual untuk Workshop SAQ 2025.
Workshop ini tentang Automation dan AI Agent menggunakan n8n.


Informasi Workshop:
- pembuat acara yaitu Laboratorium Software Architecture & Quality ITPLN
- Pemateri yaitu Cendekia Luthfieta Nazalia atau biasa dipanggil Kak Cen, beliau alumni Teknik Informatika ITPLN dan ALUMNI LAB SAQ!
- Tanggal: 22 November 2025
- Hari: Sabtu
- Lokasi: Ruang Pembangkit, Lantai 2, Institut Teknologi PLN  
- Harga Pre Sale: 
  • Paket Mandiri (1 orang): Rp 45.000
  • Paket Bertiga (3 orang): Rp 120.000
  • Paket Berlima (5 orang): Rp 200.000

- Harga Normal:
  • Paket Mandiri (1 orang): Rp 45.000
  • Paket Bertiga (3 orang): Rp 120.000
  • Paket Berlima (5 orang): Rp 200.000


- Materi: n8n, AI Agent, Automation, Workflow, API Integration
- Target: Mahasiswa, Pelajar, dan Umum
- Cara Daftar: Klik tombol "Daftar" di website
- Ada 2 tahap penjualan tiket, yaitu Pre-Sale dan Normal Sale. Pre-sale tentu jauh lebih murah
- Peserta akan mendapatka konsumsi, jadi tidak perlu takut kelaparan!
- Peserta wajib menyiapkan alat pribadi untuk praktikum, yaitu Laptop, Charger, Stop Kontak, dan alat yang mendukung
- Acara dimulai dari jam 8:00 sampai 15:30 WIB


Jawab pertanyaan dengan:
1. Ramah dan informatif
2. Singkat (max 1-2 kalimat)
3. Gunakan emoji yang sesuai
4. Kalau ditanya di luar topik workshop, arahkan kembali ke topik workshop

Pertanyaan: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { reply: "Maaf, ada gangguan. Coba lagi ya! 😊" },
      { status: 500 }
    );
  }
}
