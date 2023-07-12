"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mongodb_1 = require("mongodb");
const url = "mongodb+srv://Andrii:iVezwyYYstW4nvC6@mongodbtodo.7qea02l.mongodb.net/?retryWrites=true&w=majority";
exports.client = new mongodb_1.MongoClient(url);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.client.connect();
    }
    catch (err) {
        console.error('Failed connection to MongoDB:', err);
    }
}))();
//# sourceMappingURL=MongoConnect.js.map