import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; // Render requires an open port
const URL = "https://backend-1-08px.onrender.com"; // Replace with your actual Render backend URL

// Function to ping the backend
const pingServer = async (retries = 3) => {
    try {
        const fetch = (await import('node-fetch')).default; // Dynamic import for ESM
        const res = await fetch(URL);
        console.log(`[${new Date().toLocaleString()}] Pinged ${URL} - Status: ${res.status}`);

        if (res.status !== 200 && retries > 0) {
            console.warn(`Retrying in 30 seconds... (${retries} retries left)`);
            setTimeout(() => pingServer(retries - 1), 30000); // Retry after 30 sec
        }
    } catch (err) {
        if (retries > 0) {
            console.warn(`Ping failed. Retrying in 30 seconds... (${retries} retries left)`);
            setTimeout(() => pingServer(retries - 1), 30000); // Retry after 30 sec
        } else {
            console.error(`[${new Date().toLocaleString()}] Ping failed:`, err);
        }
    }
};

// Ping every 14 minutes (14 * 60 * 1000 ms)
setInterval(pingServer, 14 * 60 * 1000);

console.log(`[${new Date().toLocaleString()}] Pinger service started...`);
pingServer(); // First immediate ping

// Express server to keep Render service alive
app.get("/", (req, res) => {
    res.send("Pinger service is running...");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
