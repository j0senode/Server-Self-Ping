// Keep Render free tier alive - ping every 4 minutes
setInterval(async () => {
  try {
    await fetch(`https://yourbackendurl.com/health`);
    console.log("[ping] server kept alive");
  } catch {
    console.warn("[ping] self-ping failed");
  }
}, 4 * 60 * 1000);
