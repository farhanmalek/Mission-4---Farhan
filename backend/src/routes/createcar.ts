import express, { Request, Response } from "express";
import { Router } from "express";
import CarModel, { Car } from "../db/Cars";

const createCarRouter: Router = express.Router();

createCarRouter.post("/createcar", async (req: Request, res: Response) => {
  try {
    const requestData = req.body;

    // If requestData is an array, treat it as multiple cars
    if (Array.isArray(requestData)) {
      const createdCars = await CarModel.create(requestData);
      res.status(201).send({ message: "Cars created successfully", cars: createdCars });
    } else if (typeof requestData === "object") {
      // If requestData is an object, treat it as a single car
      const newCar = new CarModel(requestData);
      const savedCar = await newCar.save();
      res.status(201).send({ message: "Car created successfully", car: savedCar });
    } else {
      // Invalid data format
      res.status(400).send({ message: "Invalid data format. Expected a car or an array of cars." });
    }
  } catch (error) {
    console.error("Error creating car(s):", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

export default createCarRouter;

