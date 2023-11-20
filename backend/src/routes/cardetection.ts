import express, { Request, Response } from "express";
import { Router } from "express";
import axios from "axios";
import { colors, cars } from "../utils/variables";
import CarModel, {Car} from "../db/Cars";

const router: Router = express.Router();

interface apiResponse {
  name: string;
  confidence: number;
}

function getColorAndTypeArrays(apiData: apiResponse[]): string[][] {
  let carType: string[] = [];
  let carColor: string[] = [];
  const typeArray: string[] = apiData.map((type: apiResponse) => type.name);
  typeArray.forEach((type: string) => {
    if (cars.includes(type)) {
      carType.push(type);
    } else if (colors.includes(type)) {
      carColor.push(type);
    }
  });
  return [carType, carColor];
}

router.post("/carvision", async (req: Request, res: Response) => {
  try {
    const [carType, carColor] = getColorAndTypeArrays(req.body);
    const carTypeMatch: string = carType[0];
    const carColorMatch: string = carColor[0];

    // Find exact match if both carType and carColor are provided
    if (carType.length > 0 && carColor.length > 0) {
      const matchingCars = await CarModel.find({ bodyType: carTypeMatch, color: carColorMatch });
      if (matchingCars.length > 0) {
        return res.status(200).json(matchingCars);
      }
    }

    // If no exact match, try finding cars based on carType alone
    if (carType.length > 0) {
      const matchingCars = await CarModel.find({ bodyType: carTypeMatch });
      if (matchingCars.length > 0) {
        return res.status(200).json(matchingCars);
      }
    }

    // No cars found
    res.status(400).json({ message: "No cars found" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
