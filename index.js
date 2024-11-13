import express from "express";
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello, world!"
    })
});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "not found!"
    })
});

app.listen(PORT, () => { 
    console.log(`server listening on port ${PORT}`)
});