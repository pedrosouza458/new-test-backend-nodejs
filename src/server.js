import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/config.js";

dotenv.config();

await connectToDatabase();
const app = express();

app.listen(3000, () => {
  console.log("server is running");
});
