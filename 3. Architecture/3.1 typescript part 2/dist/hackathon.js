"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
let plusCount = 0;
let minusCount = 0;
function clickCounter(button) {
    if (button === "Plus" /* Button.Plus */) {
        plusCount++;
    }
    else if (button === "Minus" /* Button.Minus */) {
        minusCount++;
    }
}
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.post('/button', (req, res) => {
    const { button } = req.body;
    clickCounter(button);
    res.json({ plusCount, minusCount });
});
app.listen(3000, () => {
    console.log('Server is listening on port: 3000');
});
//# sourceMappingURL=hackathon.js.map