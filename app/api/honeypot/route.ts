import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const ntfyUrl = process.env.NTFY_TOPIC_URL;

  if (!ntfyUrl) {
    console.error("NTFY_TOPIC_URL is not set");
    return NextResponse.json({ success: false }, { status: 500 });
  }

  let message = "";

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json();
    message = body.message || "";
  } else {
    const formData = await request.formData();
    message = (formData.get("message") as string) || "";
  }

  try {
    await fetch(ntfyUrl, {
      method: "POST",
      body: `LLM Trap Triggered\nMessage: ${message}\nIP: ${ip}\nUA: ${userAgent}`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to log message", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
