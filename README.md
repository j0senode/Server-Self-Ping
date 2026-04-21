# Server-Self-Ping
Render Keep-Alive Ping

A minimal Node.js script that keeps your Render free-tier backend alive by pinging a health endpoint every few minutes.

📌 Why This Exists

Render’s free tier puts services to sleep after inactivity.
That leads to:

Cold starts
Slow first response
Users thinking your app is broken

This script prevents that by sending a request every 4 minutes to keep the service active.

⚙️ How It Works

It uses setInterval to periodically hit your /health endpoint.

setInterval(async () => {
  try {
    await fetch("https://yourbackendurl.com/health");
    console.log("[ping] server kept alive");
  } catch {
    console.warn("[ping] self-ping failed");
  }
}, 4 * 60 * 1000);
🚀 Setup
Add the script to your project (e.g. keepAlive.js)

Replace:

https://yourbackendurl.com/health

with your actual backend URL

Make sure your server has a health route:
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
Run the script alongside your server:
node keepAlive.js
🧠 Notes
Runs every 4 minutes to stay safely under Render’s idle timeout
The /health route should be lightweight
Requires Node.js with fetch support
(Node 18+ or install node-fetch)
⚠️ Disclaimer

This is a workaround, not an official solution.

Render may change how their free tier behaves
This approach may stop working in the future
For production apps, consider upgrading to a paid plan
💡 Alternatives

Instead of running this script internally, you can use external uptime monitors like:

UptimeRobot
Cron-job.org

They can ping your endpoint at intervals without modifying your backend.

🧩 Use Cases
Indie projects
MVPs
Side projects that need basic uptime without extra cost
🏁 Summary

If you’re not ready to pay for uptime, this keeps your backend awake just enough to feel reliable.

Not pretty. Not official. But it gets the job done.
