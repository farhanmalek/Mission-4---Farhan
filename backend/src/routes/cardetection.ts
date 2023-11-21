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
    console.log(carType, "cartypes")
    let carTypeMatch: string = carType[0];
    const carColorMatch: string = carColor[0];

    //Further filtering logic to combat inconsistencies in the API.
    if (carTypeMatch === "city car") {
      if ((carType.includes("sedan")) || carType.includes("mid-size car") && !carType.includes("hatchback")) {
        carTypeMatch = "sedan";
      } else if ((carType.includes("hatchback")) || carType.includes("compact")) {
        carTypeMatch = "hatchback";
      }
    } else if (carTypeMatch === "hatchback" && carType.includes("sport utility vehicle")) {
      carTypeMatch = "suv";
    } else if(carTypeMatch === "sport utility vehicle" && carType.includes("truck") || carType.includes("pickup")) {
      carTypeMatch = "truck";
    }

    console.log(carTypeMatch, carColorMatch);

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
    res.status(200).json([]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
