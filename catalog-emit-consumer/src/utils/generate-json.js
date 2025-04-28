import { uploadJsonToS3 } from "../lib/s3.js";
import { category } from "../models/category.model.js";
import { product } from "../models/product.model.js";
import dotenv from "dotenv";

dotenv.config();

export async function generateAndPublishJSON(owner) {
  const itens = await product.find({ owner });

  const ownerCategory = await category.findOne({ owner });
  const { title, description } = ownerCategory;

  const catalog = {
    owner,
    catalog: [
      {
        category_title: title,
        category_description: description,
        itens,
      },
    ],
  };
  console.log(catalog);
  await uploadJsonToS3(process.env.S3_BUCKET, `catalog-${Date.now()}`, catalog);
}
