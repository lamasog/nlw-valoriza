import express from "express";
import "reflect-metadata";

import "./database";

// @types/express
const app = express();

app.get("/test", (req, res) => {
    return res.send("Olá, NLW.");
});

app.post("/test-post", (req, res) => {
    return res.send("Olá, NLW método post.");
})

app.listen(3000, () => console.log('Server is running at port 3000!'));