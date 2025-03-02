const URL = "https://backend-1-08px.onrender.com"; // Replace with your actual Render project URL

const pingServer = async () => {
    try {
        const fetch = (await import('node-fetch')).default;
        const res = await fetch(URL);
        console.log(`Pinged ${URL} - Status: ${res.status}`);
    } catch (err) {
        console.error("Ping failed:", err);
    }
};

// Ping every 14 minutes (14 * 60 * 1000 ms)
setInterval(pingServer, 14 * 60 * 1000);

console.log("Pinger service started...");
pingServer(); // First immediate ping
