const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 4000; // Use the port provided by Render

const url = 'https://backend-1-08px.onrender.com/';

// Function to fetch the message
async function fetchMessage() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    console.log('Message:', data.message);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Call fetchMessage every 14 minutes
setInterval(fetchMessage, 14 * 60 * 1000);
fetchMessage(); // Initial call

// Dummy endpoint to keep the service running
app.get('/', (req, res) => {
  res.send('Fetch service is running');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
