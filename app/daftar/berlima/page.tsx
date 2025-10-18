// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { ArrowLeft, Upload, Loader2 } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useTicketConfig } from "@/hooks/useTicketConfig";

// const SCRIPT_URL =
//   "https://script.google.com/macros/s/AKfycbzNtoIvIKYWDFTLw-lPkQzKa-IO6z83jygGkqCB3SWt2fXUsnvdJXoQJbXDuH3fnfZueQ/exec";

// export default function DaftarBerlimaPage() {
//   const { getActivePackage, formatPrice } = useTicketConfig();
//   const packageData = getActivePackage("berlima");

//   const [formData, setFormData] = useState({
//     pemesanWA: "",
//     pemesanEmail: "",
//     // Peserta 1
//     peserta1_namaLengkap: "",
//     peserta1_asalInstansi: "",
//     peserta1_status: "Mahasiswa",
//     peserta1_jurusan: "",
//     peserta1_nim: "",
//     peserta1_nomorWA: "",
//     peserta1_email: "",
//     // Peserta 2
//     peserta2_namaLengkap: "",
//     peserta2_asalInstansi: "",
//     peserta2_status: "Mahasiswa",
//     peserta2_jurusan: "",
//     peserta2_nim: "",
//     peserta2_nomorWA: "",
//     peserta2_email: "",
//     // Peserta 3
//     peserta3_namaLengkap: "",
//     peserta3_asalInstansi: "",
//     peserta3_status: "Mahasiswa",
//     peserta3_jurusan: "",
//     peserta3_nim: "",
//     peserta3_nomorWA: "",
//     peserta3_email: "",
//     // Peserta 4
//     peserta4_namaLengkap: "",
//     peserta4_asalInstansi: "",
//     peserta4_status: "Mahasiswa",
//     peserta4_jurusan: "",
//     peserta4_nim: "",
//     peserta4_nomorWA: "",
//     peserta4_email: "",
//     // Peserta 5
//     peserta5_namaLengkap: "",
//     peserta5_asalInstansi: "",
//     peserta5_status: "Mahasiswa",
//     peserta5_jurusan: "",
//     peserta5_nim: "",
//     peserta5_nomorWA: "",
//     peserta5_email: "",
//   });

//   const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   if (!packageData) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//         <div className="text-center">
//           <p className="text-gray-600">Pendaftaran tidak tersedia saat ini.</p>
//           <Link
//             href="/daftar"
//             className="text-biru hover:underline mt-4 inline-block"
//           >
//             Kembali ke pilihan paket
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setBuktiPembayaran(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Convert file to base64
//       let fileBase64 = "";
//       let fileName = "";
//       let fileType = "";

//       if (buktiPembayaran) {
//         const reader = new FileReader();
//         fileBase64 = await new Promise<string>((resolve, reject) => {
//           reader.onload = () => {
//             const result = reader.result as string;
//             resolve(result.split(",")[1]);
//           };
//           reader.onerror = reject;
//           reader.readAsDataURL(buktiPembayaran);
//         });
//         fileName = buktiPembayaran.name;
//         fileType = buktiPembayaran.type;
//       }

//       // Build payload for 5 participants
//       const payload = {
//         jumlahPeserta: "5",
//         pemesanWA: formData.pemesanWA,
//         pemesanEmail: formData.pemesanEmail,
//         // Peserta 1
//         peserta1_namaLengkap: formData.peserta1_namaLengkap,
//         peserta1_asalInstansi: formData.peserta1_asalInstansi,
//         peserta1_status: formData.peserta1_status,
//         peserta1_jurusan: formData.peserta1_jurusan || "-",
//         peserta1_nim: formData.peserta1_nim || "-",
//         peserta1_nomorWA: formData.peserta1_nomorWA,
//         peserta1_email: formData.peserta1_email,
//         // Peserta 2
//         peserta2_namaLengkap: formData.peserta2_namaLengkap,
//         peserta2_asalInstansi: formData.peserta2_asalInstansi,
//         peserta2_status: formData.peserta2_status,
//         peserta2_jurusan: formData.peserta2_jurusan || "-",
//         peserta2_nim: formData.peserta2_nim || "-",
//         peserta2_nomorWA: formData.peserta2_nomorWA,
//         peserta2_email: formData.peserta2_email,
//         // Peserta 3
//         peserta3_namaLengkap: formData.peserta3_namaLengkap,
//         peserta3_asalInstansi: formData.peserta3_asalInstansi,
//         peserta3_status: formData.peserta3_status,
//         peserta3_jurusan: formData.peserta3_jurusan || "-",
//         peserta3_nim: formData.peserta3_nim || "-",
//         peserta3_nomorWA: formData.peserta3_nomorWA,
//         peserta3_email: formData.peserta3_email,
//         // Peserta 4
//         peserta4_namaLengkap: formData.peserta4_namaLengkap,
//         peserta4_asalInstansi: formData.peserta4_asalInstansi,
//         peserta4_status: formData.peserta4_status,
//         peserta4_jurusan: formData.peserta4_jurusan || "-",
//         peserta4_nim: formData.peserta4_nim || "-",
//         peserta4_nomorWA: formData.peserta4_nomorWA,
//         peserta4_email: formData.peserta4_email,
//         // Peserta 5
//         peserta5_namaLengkap: formData.peserta5_namaLengkap,
//         peserta5_asalInstansi: formData.peserta5_asalInstansi,
//         peserta5_status: formData.peserta5_status,
//         peserta5_jurusan: formData.peserta5_jurusan || "-",
//         peserta5_nim: formData.peserta5_nim || "-",
//         peserta5_nomorWA: formData.peserta5_nomorWA,
//         peserta5_email: formData.peserta5_email,
//         // File
//         buktiPembayaranBase64: fileBase64,
//         buktiPembayaranName: fileName,
//         buktiPembayaranType: fileType,
//       };

//       await fetch(SCRIPT_URL, {
//         method: "POST",
//         mode: "no-cors",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       // Wait for processing
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setSubmitSuccess(true);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Terjadi kesalahan. Silakan coba lagi.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (submitSuccess) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-black shadow-xl text-center"
//         >
//           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg
//               className="w-10 h-10 text-green-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//           <h2 className="font-heading font-bold text-3xl text-gray-800 mb-4">
//             Pendaftaran Berhasil! 🎉
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Data kamu sudah kami terima. Kami akan menghubungi kamu melalui
//             WhatsApp untuk konfirmasi selanjutnya.
//           </p>
//           <Link href="/">
//             <button className="w-full bg-biru hover:bg-blue-700 text-white font-heading font-bold py-3 px-6 rounded-2xl transition-all">
//               Kembali ke Home
//             </button>
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   const renderPesertaFields = (pesertaNum: number) => {
//     const prefix = `peserta${pesertaNum}`;
//     const status = formData[`${prefix}_status` as keyof typeof formData];

//     return (
//       <div key={pesertaNum} className="bg-gray-50 rounded-2xl p-6 space-y-4">
//         <h4 className="font-heading font-bold text-lg text-gray-800 mb-4">
//           Peserta {pesertaNum}
//         </h4>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Nama Lengkap *
//           </label>
//           <input
//             type="text"
//             name={`${prefix}_namaLengkap`}
//             value={formData[`${prefix}_namaLengkap` as keyof typeof formData]}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Asal Instansi *
//           </label>
//           <input
//             type="text"
//             name={`${prefix}_asalInstansi`}
//             value={formData[`${prefix}_asalInstansi` as keyof typeof formData]}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Status *
//           </label>
//           <select
//             name={`${prefix}_status`}
//             value={status as string}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//           >
//             <option value="Mahasiswa">Mahasiswa</option>
//             <option value="Pelajar">Pelajar</option>
//             <option value="Umum">Umum</option>
//           </select>
//         </div>

//         {status === "Mahasiswa" && (
//           <>
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">
//                 Jurusan *
//               </label>
//               <input
//                 type="text"
//                 name={`${prefix}_jurusan`}
//                 value={formData[`${prefix}_jurusan` as keyof typeof formData]}
//                 onChange={handleInputChange}
//                 required
//                 placeholder='Isi "-" apabila Pelajar/Umum'
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-gray-700 mb-2">
//                 NIM *
//               </label>
//               <input
//                 type="text"
//                 name={`${prefix}_nim`}
//                 value={formData[`${prefix}_nim` as keyof typeof formData]}
//                 onChange={handleInputChange}
//                 required
//                 placeholder='Isi "-" apabila Pelajar/Umum'
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//               />
//             </div>
//           </>
//         )}

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Nomor WhatsApp *
//           </label>
//           <input
//             type="tel"
//             name={`${prefix}_nomorWA`}
//             value={formData[`${prefix}_nomorWA` as keyof typeof formData]}
//             onChange={handleInputChange}
//             required
//             placeholder="08xxxxxxxxxx"
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-bold text-gray-700 mb-2">
//             Email *
//           </label>
//           <input
//             type="email"
//             name={`${prefix}_email`}
//             value={formData[`${prefix}_email` as keyof typeof formData]}
//             onChange={handleInputChange}
//             required
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <Link
//           href="/daftar"
//           className="inline-flex items-center gap-2 text-gray-600 hover:text-biru mb-6 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           Kembali
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Form - Left Side (2 columns) */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-3xl p-6 md:p-8 border-2 border-black shadow-xl"
//             >
//               <h1 className="font-heading font-bold text-3xl text-kuning mb-2">
//                 Formulir Pendaftaran
//               </h1>
//               <p className="text-gray-600 mb-6">{packageData.name}</p>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Data Pemesan */}
//                 <div className="bg-kuning/10 rounded-2xl p-6 space-y-4">
//                   <h3 className="font-heading font-bold text-xl text-gray-800 mb-4">
//                     Data Pemesan
//                   </h3>

//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2">
//                       Nomor WhatsApp Pemesan *
//                     </label>
//                     <input
//                       type="tel"
//                       name="pemesanWA"
//                       value={formData.pemesanWA}
//                       onChange={handleInputChange}
//                       required
//                       placeholder="08xxxxxxxxxx"
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2">
//                       Email Pemesan *
//                     </label>
//                     <input
//                       type="email"
//                       name="pemesanEmail"
//                       value={formData.pemesanEmail}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Data Peserta */}
//                 <div className="space-y-4">
//                   <h3 className="font-heading font-bold text-xl text-gray-800">
//                     Data Peserta (5 Orang)
//                   </h3>
//                   {[1, 2, 3, 4, 5].map((num) => renderPesertaFields(num))}
//                 </div>

//                 {/* Upload Bukti Pembayaran */}
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700 mb-2">
//                     Upload Bukti Pembayaran *
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-biru transition-colors">
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       accept="image/*"
//                       className="hidden"
//                       id="bukti-pembayaran"
//                       required
//                     />
//                     <label
//                       htmlFor="bukti-pembayaran"
//                       className="cursor-pointer"
//                     >
//                       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-600">
//                         {buktiPembayaran
//                           ? buktiPembayaran.name
//                           : "Klik untuk upload file"}
//                       </p>
//                     </label>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-kuning hover:bg-yellow-600 text-white font-heading font-bold py-4 px-6 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Mengirim...
//                     </>
//                   ) : (
//                     "Daftar Sekarang"
//                   )}
//                 </button>
//               </form>
//             </motion.div>
//           </div>

//           {/* Payment Info - Right Side (1 column) */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-3xl p-6 border-2 border-black shadow-xl sticky top-8"
//             >
//               <h3 className="font-heading font-bold text-xl text-gray-800 mb-4">
//                 Informasi Pembayaran
//               </h3>

//               <div className="bg-kuning/10 rounded-2xl p-4 mb-6">
//                 <p className="text-sm text-gray-600 mb-2">
//                   Untuk 5 orang peserta •{" "}
//                   {formatPrice(packageData.currentPrice)}
//                 </p>
//                 <div className="border-t-2 border-gray-200 pt-3 mt-3">
//                   <div className="flex items-center justify-between">
//                     <span className="font-heading font-bold text-gray-800">
//                       Total Pembayaran
//                     </span>
//                     <span className="font-heading font-bold text-2xl text-kuning">
//                       {formatPrice(packageData.currentPrice)}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h4 className="font-heading font-bold text-sm text-gray-800 mb-3">
//                   {packageData.name}
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {packageData.participants}
//                 </p>
//                 <Image
//                   src="/qris.png"
//                   alt="QRIS Payment"
//                   width={300}
//                   height={300}
//                   className="w-full rounded-xl border-2 border-gray-200"
//                 />
//                 <p className="text-xs text-gray-500 mt-2 text-center">
//                   Scan kode QR di atas dengan aplikasi pembayaran kamu
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
