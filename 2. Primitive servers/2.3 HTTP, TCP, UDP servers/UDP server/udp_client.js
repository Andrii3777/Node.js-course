// Client UDP node udp_client.js
const dgram = require('dgram');
const PORT = 3001;

// Create UDP Socket for Client
const client = dgram.createSocket('udp4');
const startTime = new Date();

// Processing the 'message' event when a message from a server arrives
client.on('message', (message, rinfo) => {
    const elapsedTime = new Date() - startTime;

    console.log(`Received response from server: ${message}`);
    console.log(`Elapsed time: ${elapsedTime}ms`);

    client.close(); // Closing client UDP socket
});

// Sending a message to the server
const textToSend = 'Hello, UDP server!';
client.send(textToSend, PORT, (error) => {
    if (error) {
        console.error(`Error sending message to server: ${error}`);
        client.close(); // Closing client UDP socket in case of error
    } else {
        console.log(`Message sent to server: ${textToSend}`);
    }
});