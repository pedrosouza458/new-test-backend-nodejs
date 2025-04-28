import dotenv from "dotenv";
import mongoose from "mongoose";
import { category } from "../models/category.model.js";
import { product } from "../models/product.model.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.DATABASE_URI);
  console.log("Database connected");

  const owner1 = "12345";
  const category1 = await category.create({
    title: "Eletronics",
    owner: owner1,
    description: "Category for eletronics",
  });

  await product.create([
    {
      title: "GTX 2800",
      owner: owner1,
      category: category1._id,
      price: 2800.0,
      description: "GTX 2800 is hype",
    },
    {
      title: "GTX 3000",
      owner: owner1,
      category: category1._id,
      price: 3000.0,
      description: "GTX  3000 is even more hype",
    },
  ]);
}

seed().then(() => process.exit(0));
