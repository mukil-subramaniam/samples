import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; // Render requires an open port
const URL = "https://backend-1-08px.onrender.com"; // Your actual backend URL

// Function to ping the backend and fetch the 'message' attribute
const pingServer = async (retries = 3) => {
    try {
        const fetch = (await import('node-fetch')).default; // Dynamic import for ESM
        const res = await fetch(URL);
        const data = await res.json(); // Parse JSON response

        console.log(`[${new Date().toLocaleString()}] Pinged ${URL} - Message: ${data.message}`);
        return data.message || "No message attribute found"; // Return only 'message'

    } catch (err) {
        console.error(`[${new Date().toLocaleString()}] Ping failed:`, err);

        if (retries > 0) {
            console.warn(`Retrying in 30 seconds... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 sec before retrying
            return pingServer(retries - 1); // Retry
        }

        return "Ping failed after multiple retries"; // Only return 'message'
    }
};

// **Function to keep sending requests every 14 minutes**
const startAutoPing = () => {
    setInterval(() => {
        pingServer().catch(err => console.error("Auto ping failed:", err));
    }, 14 * 60 * 1000); // 14 minutes interval
};

// **Start auto pinging without user interaction**
startAutoPing();
console.log(`[${new Date().toLocaleString()}] Auto pinger started...`);
pingServer(); // First immediate ping

// API route to manually trigger the ping and return JSON
app.get("/ping", async (req, res) => {
    const message = await pingServer();
    res.json({ message });
});

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Pinger service is running..." });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
