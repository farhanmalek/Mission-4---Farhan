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
const variables_1 = require("../utils/variables");
const Cars_1 = __importDefault(require("../db/Cars"));
const router = express_1.default.Router();
function getColorAndTypeArrays(apiData) {
    let carType = [];
    let carColor = [];
    const typeArray = apiData.map((type) => type.name);
    typeArray.forEach((type) => {
        if (variables_1.cars.includes(type)) {
            carType.push(type);
        }
        else if (variables_1.colors.includes(type)) {
            carColor.push(type);
        }
    });
    return [carType, carColor];
}
router.post("/carvision", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [carType, carColor] = getColorAndTypeArrays(req.body);
        const carTypeMatch = carType[0];
        const carColorMatch = carColor[0];
        // Find exact match if both carType and carColor are provided
        if (carType.length > 0 && carColor.length > 0) {
            const matchingCars = yield Cars_1.default.find({ bodyType: carTypeMatch, color: carColorMatch });
            if (matchingCars.length > 0) {
                return res.status(200).json(matchingCars);
            }
        }
        // If no exact match, try finding cars based on carType alone
        if (carType.length > 0) {
            const matchingCars = yield Cars_1.default.find({ bodyType: carTypeMatch });
            if (matchingCars.length > 0) {
                return res.status(200).json(matchingCars);
            }
        }
        // No cars found
        res.status(400).json({ message: "No cars found" });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}));
exports.default = router;
