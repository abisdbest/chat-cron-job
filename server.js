const express = require('express');
const cron = require('node-cron');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('Server woken up!');
  res.send('Server woken up!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule a cron job to ping the server every minute
cron.schedule('* * * * *', () => {
  console.log('Pinging server...');
  http.get('https://blooket1-chat-server.onrender.com', (response) => {
    let data = '';

    // A chunk of data has been received
    response.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received
    response.on('end', () => {
      console.log('Server pinged successfully.');
    });
  }).on('error', (err) => {
    console.error('Error pinging server:', err);
  });
});
