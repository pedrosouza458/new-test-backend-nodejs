import { category } from "../models/category.model.js";
import { product } from "../models/product.model.js";

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
  // publish in AWS S3
}
