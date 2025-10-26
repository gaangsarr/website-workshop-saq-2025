// app/api/log-submit/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, data } = await request.json();
    console.log(`[CLIENT SUBMIT LOG]: ${message}`);
    console.log("Submission Data:", data);
    return NextResponse.json(
      { status: "success", message: "Logged to server terminal" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging submit:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to log submit" },
      { status: 500 }
    );
  }
}

// Opsional: Handle metode lain jika diperlukan, atau kembalikan 405 Method Not Allowed
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
