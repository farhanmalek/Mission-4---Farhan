import express, {Express, Response,Request} from 'express';
import cors from 'cors';
import router from './routes/cardetection';
import createCarRouter from './routes/createcar';
import mongoose from 'mongoose';
require('dotenv').config();
const app:Express = express();
const url:string = process.env.MONGO_KEY as string;


//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/", router);
app.use("/", createCarRouter);


//Connections to DB and Port
async function connect() {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error); 
    }
}
connect();

const port:number = 5000;
app.listen(port, () => {
    console.log(`Serving Base @ http://localhost:${port}`);
})