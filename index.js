import express from "express";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
dotenv.config();

import { db } from "./configs/db.js";
const app = express();
const PORT = process.env.PORT || 3000;

//middleware untuk parsing JSON pada request body
app.use(express.json());
app.use('/api/v1/users', userRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, world!"
    })
});

app.get("/data", async (req, res) => {
    try {
        const collection = db.collection("users");
        const data = await collection.find().toArray();
        console.log("Data fetched: ", data); // Log tambahan
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data: ", error);
        res.status(500).json({ message: "Error fetching data", error });
    }
});
app.get("*", (req, res) => {
    res.status(404).json({
        message: "not found!"
    })
});

app.listen(PORT, () => { 
    console.log(`server listening on port ${PORT}`)
});