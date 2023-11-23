import express, {Express, Response,Request} from 'express';
import cors from 'cors';
import router from './routes/cardetection';
import createCarRouter from './routes/createcar';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv').config();
const app:Express = express();
const url:string = process.env.MONGO_KEY as string;


//middleware
app.use(cors());
// app.use(express.json());
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
//Routes
app.use("/", router);
app.use("/", createCarRouter);

app.get("/", (req:Request, res:Response) => {
    res.send("Welcome to the Base API");

})


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

const port:number | string = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving Base @ http://localhost:${port}`);
})