/**
 * One-off test: sends a sample form-submission notify SMS via Sparrow.
 * Usage: node scripts/test-form-notify.mjs
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");

function loadEnvFile(path) {
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    console.error("Could not read .env.local at", path);
    process.exit(1);
  }
}

loadEnvFile(envPath);

function normalizeSparrowToken(raw) {
  if (!raw) return "";
  let t = String(raw).trim();
  const label = t.match(/^(.+?)\s*\([^)]+\)\s*$/);
  if (label) t = label[1].trim();
  return t;
}

const token = normalizeSparrowToken(process.env.SPARROW_SMS_TOKEN);
const from = (process.env.SPARROW_SMS_FROM ?? "Demo").trim();
const defaultTo = "9852024365,9852031716";
const recipients = (process.env.FORM_NOTIFY_SMS_TO ?? defaultTo)
  .split(/[,;\s]+/)
  .map((p) => p.replace(/\D/g, "").slice(-10))
  .filter((d) => d.length === 10);
const to = recipients[0] ?? "9852024365";

const fullName = "Test User";
const phone = "9811111111";
const text = `TestDrive Form has been submitted by ${fullName}, ${phone} - Nepal Motor`;

if (!token) {
  console.log("[dry run] SPARROW_SMS_TOKEN not set. Would send to", recipients, ":\n", text);
  process.exit(0);
}

let failed = false;
for (const to of recipients) {
  const params = new URLSearchParams();
  params.set("token", token);
  params.set("from", from);
  params.set("to", to);
  params.set("text", text);

  console.log("Sending test SMS to", to, "…");

  const resp = await fetch("https://api.sparrowsms.com/v2/sms/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const body = await resp.text();
  let data = null;
  try {
    data = JSON.parse(body);
  } catch {
    /* ignore */
  }

  console.log("HTTP", resp.status);
  console.log("Response:", data ?? body);

  if (!resp.ok || !data || data.response_code !== 200) {
    console.error("FAILED for", to);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("OK — check phones", recipients.join(", "), "for the test message.");
