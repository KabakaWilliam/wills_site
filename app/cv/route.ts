import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const configuredUrl = process.env.CV_PDF_URL;
  const fallback = new URL("/William_Gitta_Lugoloobi_CV.pdf", request.url);

  return NextResponse.redirect(configuredUrl || fallback);
}
