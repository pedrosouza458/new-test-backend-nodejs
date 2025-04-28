import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectToDb = mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Connected to datbase!"))
  .catch((error) => console.log("Connection failed", error));
