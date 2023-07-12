"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const v1_1 = __importDefault(require("./api/v1"));
const v2_1 = __importDefault(require("./api/v2"));
// import path from 'path';
const app = (0, express_1.default)();
const port = 3005;
app.use(express_1.default.json());
// app.use(express.static(path.join(__dirname, '../public'))); // Hosting static files
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use((0, express_session_1.default)({
    store: new express_session_1.default.MemoryStore(),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));
app.use('/api/v1', v1_1.default);
app.use('/api/v2', v2_1.default);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
//# sourceMappingURL=index.js.map