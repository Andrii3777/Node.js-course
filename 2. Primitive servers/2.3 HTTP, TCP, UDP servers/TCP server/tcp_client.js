// Client TCP node tcp_client.js
const net = require('net');
const PORT = 3002;

// Create TCP Socket for Client
const client = new net.Socket();
const startTime = new Date();

// Connection to the server
client.connect(PORT, 'localhost', () => {
    const elapsedTime = new Date() - startTime;

    console.log(`Connected to server`);
    console.log(`Elapsed time for connection: ${elapsedTime}ms`);

    client.write('Hello, TCP server!'); // Sending a message to the server
    // Processing the 'data' event when data from server arrives
    
    client.on('data', data => {
        const receivedData = data.toString();
        const elapsedTime = new Date() - startTime;

        console.log(`Received response from server: ${receivedData}`);
        console.log(`Elapsed time: ${elapsedTime}ms`)

        client.end(); // Closing Client TCP Socket
    });

    // Processing the 'close' event when the server connection is closed
    client.on('close', () => {
        console.log('Connection closed');
    });

    // Processing the 'error' event when connection error occurs
    client.on('error', error => {
        console.error(`Error with connection: ${error}`);
    });
});
