<<<<<<< HEAD
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
=======
// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

// Definisi lokasi file router
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const appRoutes = require('./src/routes/router-app');

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurasi library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 't@1k0ch3ng',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 60000
    },
}))
app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', appRoutes);

// Gunakan port server
app.listen(5050, ()=>{
    console.log('Server Berjalan di Port : '+5050);
});
>>>>>>> 6e56227c72837991bbece3b7776decf6b2d55564
