import { handlers } from "@/auth";
import { getLastAuthError } from "@/lib/authErrorStore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await handlers.GET(req);
  const location = res.headers.get("location");
  if (location && location.includes("error=")) {
    const errorDetail = getLastAuthError();
    if (errorDetail) {
      try {
        const url = new URL(location, req.url);
        url.searchParams.set("error_detail", errorDetail);
        return NextResponse.redirect(url.toString(), {
          headers: res.headers,
        });
      } catch {}
    }
  }
  return res;
}

export async function POST(req: NextRequest) {
  const res = await handlers.POST(req);
  const location = res.headers.get("location");
  if (location && location.includes("error=")) {
    const errorDetail = getLastAuthError();
    if (errorDetail) {
      try {
        const url = new URL(location, req.url);
        url.searchParams.set("error_detail", errorDetail);
        return NextResponse.redirect(url.toString(), {
          headers: res.headers,
        });
      } catch {}
    }
  }
  return res;
}
