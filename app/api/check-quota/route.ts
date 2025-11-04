/**
 * API Route: Check Form Quota Status
 * This route acts as a proxy to bypass CORS issues when calling Google Apps Script
 * Server-side requests don't have CORS restrictions
 */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwRI21VPRj8bl89PNJZot0YWIO7I4qdDO-3gVZFvqH5hVvahrXYSRX-8Xuk2baEvUZ3gA/exec";

export async function GET(request: Request) {
  try {
    // Use GET to call doGet() function in Google Apps Script
    // GET requests don't have CORS issues when called from server
    const response = await fetch(`${SCRIPT_URL}?action=checkStatus`, {
      method: "GET",
    });

    const contentType = response.headers.get("content-type");
    let data;

    // Handle both JSON and plain text responses
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      // Try to parse as JSON, otherwise return error
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Response is not JSON:", text);
        return new Response(
          JSON.stringify({
            error: "Invalid response from quota check",
            raw: text,
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

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error checking quota:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to check quota",
        details: error instanceof Error ? error.message : String(error),
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
