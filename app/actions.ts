"use server";

import { headers } from "next/headers";

export async function logToNtfy(message: string) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const ntfyUrl = process.env.NTFY_TOPIC_URL;

  if (!ntfyUrl) {
    console.error("NTFY_TOPIC_URL is not set");
    return { success: false };
  }

  try {
    await fetch(ntfyUrl, {
      method: "POST",
      body: `LLM Trap Triggered: ${message} (IP: ${ip})`,
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to log message", err);
    return { success: false };
  }
}
