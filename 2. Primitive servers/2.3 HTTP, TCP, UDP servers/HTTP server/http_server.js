// Server HTTP node http_server.js
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    let requestData = '';

    // Processing the 'data' event when data from client receives
    req.on('data', chunk => requestData += chunk);

    // Processing the 'end' event when the client data is fully received
    req.on('end', () => {
        const clientIP = req.socket.remoteAddress;
        const currentTime = new Date().toLocaleTimeString();
        
        // Logging of data received
        console.log(`[${currentTime}] Received data from client ${clientIP}: ${requestData}`);

        res.setHeader('Content-Type', 'text/plain');
        // Sending data back to the customer
        res.write(requestData);
        // Completion of the server response
        res.end();

        // Logging of sent data
        console.log(`[${currentTime}] Sent response to client ${clientIP}: ${requestData}`);
    });
});

// Processing the 'connection' event when a new client connection is established
server.on('connection', socket => {
    const clientIP = socket.remoteAddress;
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] New connection established with client ${clientIP}`);

    // Processing the 'close' event when the client connection is closed
    socket.on('close', () => {
        console.log(`[${currentTime}] Connection closed with client ${clientIP}`);
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));