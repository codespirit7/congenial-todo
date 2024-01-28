import express , {Request, Response} from "express";

import mongoose from 'mongoose'

import authRoute from "./router/authRoute.js"

import taskRoute from "./router/taskRoute.js"

import dotenv from 'dotenv';

import cors from 'cors'

dotenv.config();

const corsOptions = {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials:true,
};


const app = express();

app.use(cors(corsOptions))

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/health", (req:Request, res:Response) => {
    res.send("server health is good.");
})

app.use("/api", authRoute);

app.use("/api", taskRoute);


const mongo_url = process.env.MONGO_URL as string;


const PORT = process.env.PORT || 5000;

mongoose.connect(mongo_url as string).then(() => console.log("mongodb connected"));

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});