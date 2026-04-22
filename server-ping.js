const DEFAULT_PING_URL = "https://yourbackendurl.com/health";
const DEFAULT_PING_INTERVAL_MS = 10 * 60 * 1000;

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const pingUrl = process.env.PING_URL || DEFAULT_PING_URL;
const intervalMs = parsePositiveInteger(process.env.PING_INTERVAL_MS, DEFAULT_PING_INTERVAL_MS);

async function pingServer() {
  try {
    const response = await fetch(pingUrl);
    if (!response.ok) {
      console.warn(`[ping] health check returned ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.warn("[ping] self-ping failed", err?.message || err);
  }
}

console.log(`[ping] keep-alive enabled: ${pingUrl} every ${intervalMs}ms`);
setInterval(pingServer, intervalMs);
