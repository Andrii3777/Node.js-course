// Server TCP node tcp_server.js
const net = require('net');
const PORT = 3002;

const server = net.createServer(socket => {
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
    const currentTime = new Date().toLocaleTimeString(); // Текущее время
    
    console.log(`[${currentTime}] New connection established with client ${clientAddress}`);

    // Processing the 'data' event when data from client arrives
    socket.on('data', data => {
        const receivedData = data.toString();
        console.log(`[${currentTime}] Received data from client ${clientAddress}: ${receivedData}`);

        // Sending data back to the client
        socket.write(receivedData);
        console.log(`[${currentTime}] Sent response to client ${clientAddress}: ${receivedData}`);
    });

    // Processing the 'close' event when the client connection is closed
    socket.on('close', () => {
        console.log(`[${currentTime}] Connection closed with client ${clientAddress}`);
    });

    // Processing the 'error' event when connection error occurs
    socket.on('error', error => {
        console.error(`[${currentTime}] Error with client ${clientAddress}: ${error}`);
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));