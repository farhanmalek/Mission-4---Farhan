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
const Cars_1 = __importDefault(require("../db/Cars"));
const createCarRouter = express_1.default.Router();
createCarRouter.post("/createcar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = req.body;
        // If requestData is an array, treat it as multiple cars
        if (Array.isArray(requestData)) {
            const createdCars = yield Cars_1.default.create(requestData);
            res.status(201).send({ message: "Cars created successfully", cars: createdCars });
        }
        else if (typeof requestData === "object") {
            // If requestData is an object, treat it as a single car
            const newCar = new Cars_1.default(requestData);
            const savedCar = yield newCar.save();
            res.status(201).send({ message: "Car created successfully", car: savedCar });
        }
        else {
            // Invalid data format
            res.status(400).send({ message: "Invalid data format. Expected a car or an array of cars." });
        }
    }
    catch (error) {
        console.error("Error creating car(s):", error);
        res.status(500).send({ message: "Internal server error" });
    }
}));
exports.default = createCarRouter;
