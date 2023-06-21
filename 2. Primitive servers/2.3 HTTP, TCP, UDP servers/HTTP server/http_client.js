// Client HTTP node http_client.js
const http = require('http');

const startTime = new Date();

const options = {
    hostname: 'localhost',
    port: 3000,
    method: 'POST',
};

const req = http.request(options, res => {
    let data = '';

    // Processing the 'data' event when data from server arrives
    res.on('data', chunk => data += chunk);

    // Processing the 'end' event when the data from the server is fully received
    res.on('end', () => {
        const elapsedTime = new Date() - startTime;

        console.log(`Received response from server: ${data}`);
        console.log(`Elapsed time: ${elapsedTime}ms`);
    });
});

// Processing the error event when sending a request fails
req.on('error', error => {
    console.error(`Request error: ${error}`);
});

// Sending data to the server
req.write('Hello, HTTP server!');
req.end(); // Completion of the request