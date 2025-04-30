import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectToDb = mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.log("Connection failed", error));
