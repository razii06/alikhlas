// server/index.js
import express from "express";
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
dotenv.config(); // Pastikan dotenv di-load untuk mengakses variabel environment

import { db } from "./configs/db.js";  // Mengimpor koneksi DB dari file db.js

const app = express();
const PORT = process.env.PORT || 3000; // Port default jika tidak ada di .env

// Middleware untuk parsing JSON pada request body
app.use(express.json());
app.use('/api/v1/users', userRouter);

// Route untuk mengakses data
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello pak Reja!😊",
    });
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


// Route untuk menangani request yang tidak ditemukan
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});

// Menjalankan server Express
app.listen(PORT, () => {
    console.log(`Server started, Listening on port ${PORT}`);
});
