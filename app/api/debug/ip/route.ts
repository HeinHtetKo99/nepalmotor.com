import { NextResponse } from "next/server";

/**
 * Debug endpoint: returns the public outbound IP the Vercel function
 * is using for outgoing HTTP calls.
 *
 * Vercel does NOT give Hobby/Pro plans a fixed outbound IP — every call
 * goes out from a different IP in AWS Lambda's pool. Hit this endpoint
 * a few times in a row and you'll see different IPs each call.
 *
 * Delete this file once your senior is convinced the IP whitelist must
 * stay open (e.g. 0.0.0.0/*) for serverless deployments.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const probes = [
    "https://api.ipify.org?format=json",
    "https://ifconfig.me/all.json",
    "https://ipinfo.io/json",
  ];

  const results: Array<{ source: string; ip?: string; error?: string }> = [];

  for (const url of probes) {
    try {
      const resp = await fetch(url, { cache: "no-store" });
      const data = (await resp.json()) as { ip?: string; ip_addr?: string };
      results.push({
        source: url,
        ip: data.ip ?? data.ip_addr ?? "unknown",
      });
    } catch (err) {
      results.push({
        source: url,
        error: err instanceof Error ? err.message : "fetch failed",
      });
    }
  }

  return NextResponse.json({
    note: "Vercel outbound IP is dynamic — refresh this page a few times.",
    results,
    timestamp: new Date().toISOString(),
  });
}
