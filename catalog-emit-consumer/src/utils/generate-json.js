import { category } from "../models/category.model.js";
import { product } from "../models/product.model.js";
import dotenv from "dotenv";
import { S3Service } from "../services/s3.service.js";

dotenv.config();

const s3Service = new S3Service();

export async function generateAndPublishJSON(owner) {
  const itens = await product.find({ owner });

  if (!itens) {
    console.error(`Itens not found for owner: ${owner}`);
    return;
  }

  const ownerCategory = await category.findOne({ owner });

  if (!ownerCategory) {
    console.error(`Category not found for owner: ${owner}`);
    return;
  }

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
  // console.log(catalog);
  try {
    await s3Service.uploadJson(
      process.env.S3_BUCKET,
      `catalog-json-${owner}-${Date.now()}`,
      catalog
    );
  } catch (error) {
    console.log(error);
  }
}
