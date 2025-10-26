# iOS/Safari Form Submission Issue - Root Cause Analysis

## 🔴 ROOT CAUSE FOUND!

### Masalah Utama
File submission via **hidden iframe + form.submit()** tidak kompatibel dengan iOS Safari untuk CORS requests.

### Step-by-Step Root Cause:

#### **1. Current Implementation (FAILS on iOS):**
```typescript
const form = document.createElement("form");
form.method = "POST";
form.action = SCRIPT_URL;  // ← Google Apps Script URL
form.target = "hidden_iframe";  // ← Hidden iframe

// Submit via traditional form submission
form.submit();
```

**Masalah:**
- Form submission via iframe TIDAK mengirim CORS preflight request
- iOS Safari memiliki validasi CORS yang LEBIH KETAT daripada Android
- Google Apps Script tidak menghandle form-urlencoded dengan benar
- Hidden iframe tidak bisa mengirim `Content-Type: application/x-www-form-urlencoded` header dengan proper CORS

---

#### **2. Mengapa Bekerja di Android tapi TIDAK di iOS:**

| Aspek | Android Chrome | iOS Safari |
|-------|---------|-----------|
| CORS Validation | Lebih lenient ✓ | Sangat strict ✗ |
| Form Submission | Kadang bypass CORS | Harus strict CORS |
| Iframe Handling | More flexible | More restrictive |
| Cache Policy | Less aggressive | More aggressive |

---

#### **3. Perbedaan Implementasi:**

**CURRENT (Mandiri - Masalah):**
```typescript
// ❌ Menggunakan form submission via iframe
const form = document.createElement("form");
form.method = "POST";
form.action = SCRIPT_URL;
form.target = "hidden_iframe";
form.submit();
```

**ALTERNATIVE (Bertiga - Mungkin Bekerja):**
```typescript
// ✓ Menggunakan fetch API (jika ada di Bertiga)
// Tapi ini juga punya masalah CORS
```

---

## ✅ SOLUTION: Gunakan Next.js API Proxy untuk Form Submission

Alih-alih submit langsung ke Google Apps Script, submit ke API Next.js:

```typescript
// ✅ SOLUSI: Submit ke API Next.js dulu
const response = await fetch("/api/submit-registration", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jumlahPeserta: "1",
    namaLengkap: formData.namaLengkap,
    // ... semua field lainnya
    buktiPembayaranBase64: fileBase64,
  }),
});

// Server-side Next.js (dalam route.ts) akan forward ke Google Apps Script
// Server-to-server = NO CORS ISSUES!
```

---

## 🛠️ Implementation Plan

### Step 1: Create `/api/submit-registration` Route
- Backend akan handle form submission ke Google Apps Script
- Server-to-server tidak punya masalah CORS

### Step 2: Update `mandiri/page.tsx` Form Submission
- Ganti dari `form.submit()` ke `fetch("/api/submit-registration")`
- Kirim semua data dalam JSON body

### Step 3: Update `bertiga/page.tsx` Form Submission
- Sama seperti mandiri

### Step 4: Test di iOS Safari
- Pastikan tidak ada CORS error

---

## 🧑‍💻 Code Implementation

### Backend: `/app/api/submit-registration/route.ts`
```typescript
const SCRIPT_URL = "https://script.google.com/macros/s/...";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Convert JSON to form-urlencoded untuk Google Apps Script
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      params.append(key, String(value));
    }
    
    // Server-side request ke Google Apps Script (NO CORS!)
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    
    const result = await response.text();
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
```

### Frontend: `mandiri/page.tsx` handleSubmit()
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    let fileBase64 = "";
    let fileName = "";
    let fileType = "";

    // Convert file to base64
    if (buktiPembayaran) {
      const reader = new FileReader();
      fileBase64 = await new Promise((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(buktiPembayaran);
      });
      fileName = buktiPembayaran.name;
      fileType = buktiPembayaran.type;
    }

    // ✅ SUBMIT KE API PROXY (BUKAN LANGSUNG KE GOOGLE APPS SCRIPT)
    const response = await fetch("/api/submit-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jumlahPeserta: "1",
        namaLengkap: formData.namaLengkap,
        asalInstansi: formData.asalInstansi,
        jurusan: formData.jurusan || "-",
        nim: formData.nim || "-",
        nomorWA: formData.nomorWA,
        email: formData.email,
        status: formData.status,
        buktiPembayaranBase64: fileBase64,
        buktiPembayaranName: fileName,
        buktiPembayaranType: fileType,
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    } else {
      throw new Error(result.error || "Submission failed");
    }
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    setShowErrorModal(true);
    setIsSubmitting(false);
  }
};
```

---

## 📊 Perbandingan Before vs After

### ❌ BEFORE (Current - Fails on iOS):
```
Client (iOS Safari)
    ↓
Hidden Iframe
    ↓
form.submit() to Google Apps Script
    ↓
CORS Preflight Check FAILS on iOS Safari
    ↓
❌ Form tidak terkirim
```

### ✅ AFTER (Fixed):
```
Client (iOS Safari)
    ↓
fetch() to /api/submit-registration
    ↓
Next.js API Route (Server)
    ↓
Server-to-Server request to Google Apps Script
    ↓
✅ NO CORS ISSUES! (server-to-server is allowed)
```

---

## 🎯 Summary

| Aspek | Masalah | Solusi |
|-------|---------|--------|
| **Current** | Form via iframe → iOS CORS reject | ❌ |
| **Root Cause** | iOS Safari strict CORS validation | Browser limitation |
| **Solution** | Use Next.js API proxy | ✅ |
| **Result** | Server-to-server (no CORS) | Works on iOS! |

---

## 🚀 Next Steps

1. Buat `/api/submit-registration/route.ts`
2. Update `mandiri/page.tsx` handleSubmit
3. Update `bertiga/page.tsx` handleSubmit
4. Test di iOS Safari
5. Verify masih jalan di Android
