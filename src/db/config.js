import mongoose from "mongoose";

dotenv.config();

export const db = mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Connected to datbase!"))
  .catch((error) => console.log("Connection failed", error));
