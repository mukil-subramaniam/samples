// Import node-fetch package
const fetch = require('node-fetch');

// URL to send the request to
const url = 'https://backend-1-08px.onrender.com/';
const PORT=4000;
// Function to fetch the message
async function fetchMessage() {
  try {
    // Send the GET request
    const response = await fetch(url);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the message attribute from the response (message is returned in JSON)
    console.log('Message:', data.message);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Send a request every 14 minutes (14 * 60 * 1000 milliseconds)
setInterval(fetchMessage, 14 * 60 * 1000);

// Optionally, you can make an initial request right away
fetchMessage();
