import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; // Render requires a port

const URL = "https://backend-1-08px.onrender.com"; // Your actual backend URL

const pingServer = async () => {
    try {
        const fetch = (await import('node-fetch')).default; // Dynamic import for ESM
        const res = await fetch(URL);
        console.log(`[${new Date().toLocaleString()}] Pinged ${URL} - Status: ${res.status}`);
    } catch (err) {
        console.error(`[${new Date().toLocaleString()}] Ping failed:`, err);
    }
};

// Ping every 14 minutes (14 * 60 * 1000 ms)
setInterval(pingServer, 14 * 60 * 1000);

console.log(`[${new Date().toLocaleString()}] Pinger service started...`);
pingServer(); // First immediate ping

// Dummy route to keep Render service alive
app.get("/", (req, res) => {
    res.send("Pinger service is running...");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
