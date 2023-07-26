import express from 'express';
import path from 'path';

let plusCount = 0;
let minusCount = 0;

const enum Button {
    Plus = 'Plus',
    Minus = 'Minus',
}

function clickCounter(button: Button) {
    if (button === Button.Plus) {
        plusCount++;
    } else if (button === Button.Minus) {
        minusCount++;
    }
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/button', (req, res) => {
    const { button } = req.body;
    clickCounter(button);

    res.json({ plusCount, minusCount });
});

app.listen(3000, () => {
    console.log('Server is listening on port: 3000');
});