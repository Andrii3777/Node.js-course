// To close the program: CTRL + C
// netstat -ano | findstr :3000
// taskkill /F /IM node.exe

const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

let counter = 0;

// GET request handler on specified path
app.get('/', (req, res) => {
    res.send(`Counter: ${counter++}`);
});

// Save the counter to a file before closing the program
process.on('SIGINT', () => {
    fs.writeFileSync('counter.txt', counter.toString());
    process.exit();
});

// Load the counter from the file if it exists
if (fs.existsSync('counter.txt')) {
    counter = Number(fs.readFileSync('counter.txt', 'utf8'));
}

// Start the server
app.listen(PORT, () => {
    console.log(`Open the following link in your browser: http://localhost:${PORT}`)
})



/* const express = require('express');
const app = express();
const PORT = 8000;

let counter = 0
app.get('/', (req, res) => {
    res.send(`Counter: ${counter++}`);
})


app.listen(PORT, () => {
    console.log(`Open the following link in your browser: http://localhost:${PORT}`)
}) */