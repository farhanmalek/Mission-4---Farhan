// car.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Car extends Document {
  image: string;
  brand: string;
  color: string;
  price: number;
  bodyType: string[];
}
//Define schema
const carSchema: Schema<Car> = new Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bodyType: {
    type: [String],
    required: true,
  },
});

//Compile model from schema
const CarModel = mongoose.model<Car>("Car", carSchema);

export default CarModel