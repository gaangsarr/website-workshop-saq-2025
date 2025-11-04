/**
 * API Route: Submit Registration Form
 * Acts as proxy to forward form submission to Google Apps Script
 * This avoids iOS Safari CORS issues by using server-to-server communication
 */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwRI21VPRj8bl89PNJZot0YWIO7I4qdDO-3gVZFvqH5hVvahrXYSRX-8Xuk2baEvUZ3gA/exec";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log submission untuk debugging
    console.log("[API] Received form submission:", {
      jumlahPeserta: data.jumlahPeserta,
      namaLengkap: data.namaLengkap,
      timestamp: new Date().toISOString(),
    });

    // Convert JSON to form-urlencoded untuk Google Apps Script
    const params = new URLSearchParams();

    // Add all fields
    for (const [key, value] of Object.entries(data)) {
      // Skip null/undefined values
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    }

    console.log("[API] Forwarding to Google Apps Script...");

    // Server-side request ke Google Apps Script
    // Server-to-server requests tidak punya CORS restrictions!
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.text();

    console.log("[API] Google Apps Script response:", {
      status: response.status,
      body: result.substring(0, 100), // Log first 100 chars
    });

    // Google Apps Script returns "success" on successful submission
    if (result.includes("success") || response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Registrasi berhasil dikirim",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      throw new Error(`Google Apps Script returned: ${result}`);
    }
  } catch (error) {
    console.error("[API] Error in submit-registration:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
