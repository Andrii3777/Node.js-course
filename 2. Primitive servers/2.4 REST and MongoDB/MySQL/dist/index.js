"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importStar(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const v1_1 = __importDefault(require("./api/v1"));
const v2_1 = __importDefault(require("./api/v2"));
const path_1 = __importDefault(require("path"));
// import FileStore from 'session-file-store';
const app = (0, express_1.default)();
const port = 3005;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public'))); // Hosting static files
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use((0, express_session_1.default)({
    store: new express_session_1.MemoryStore(),
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