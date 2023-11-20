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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cardetection_1 = __importDefault(require("./routes/cardetection"));
const createcar_1 = __importDefault(require("./routes/createcar"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const app = (0, express_1.default)();
const url = process.env.MONGO_KEY;
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Routes
app.use("/", cardetection_1.default);
app.use("/", createcar_1.default);
//Connections to DB and Port
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.log(error);
        }
    });
}
connect();
const port = 5000;
app.listen(port, () => {
    console.log(`Serving Base @ http://localhost:${port}`);
});
