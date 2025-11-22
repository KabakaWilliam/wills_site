'use server'

import { headers } from 'next/headers'

export async function logToNtfy(message: string) {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || 'unknown'
  
  try {
    await fetch("https://ntfy.sh/wills-site-llm-logs", {
      method: "POST",
      body: `LLM Trap Triggered: ${message} (IP: ${ip})`,
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to log message", err);
    return { success: false };
  }
}
