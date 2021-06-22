import express from "express";
import "reflect-metadata";
import { router } from "./routes";
import "./database";

// @types/express
const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => console.log('Server is running at port 3000!'));