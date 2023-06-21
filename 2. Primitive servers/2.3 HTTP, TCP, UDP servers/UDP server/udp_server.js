// Server UDP node udp_server.js

// Create UDP Socket
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const PORT = 3001;

// Processing the 'message' event when a message from a client arrives
server.on('message', (message, rinfo) => {
    const clientIP = rinfo.address;
    const clientPort = rinfo.port;
    const currentTime = new Date().toLocaleTimeString();

    console.log(`[${currentTime}] Received data from client ${clientIP}:${clientPort}: ${message}`);
    
    // Sending the response message back to the client
    server.send(message, clientPort, clientIP, (error) => {
        if (error) {
            console.error(`Error sending response to client ${clientIP}:${clientPort}: ${error}`);
            console.log(`[${currentTime}] Sent response to client ${clientIP}:${clientPort}: ${message}`);
        }
    });
});

// Processing 'listening' event when server starts listening to port
server.on('listening', () => {
    const address = server.address();
    console.log(`Server listening on ${address.address}:${address.port}`);
});

server.bind(PORT); // Binding the server to the specified port