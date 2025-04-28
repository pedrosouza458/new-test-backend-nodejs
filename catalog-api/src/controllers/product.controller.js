import { sendSQSMessage } from "../lib/sqs.js";
import { product } from "../models/product.model.js";
import { SQSService } from "../services/sqs.service.js";

const sqsService = new SQSService();

export class ProductController {
  async createProduct(req, res) {
    const { title, owner, category, price, description } = req.body;
    try {
      await product.create({ title, owner, category, price, description });
      await sqsService.sendMessage(owner);
      res.status(201).send({
        message: "product created",
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to create product",
        error,
      });
    }
  }
  async getProductById(req, res) {
    const { id } = req.params;

    const findProduct = await product.findById(id);

    if (!findProduct) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    return res.status(200).send(findProduct);
  }
  async updateProduct(req, res) {
    const { id } = req.params;
    const { title, category, price, description } = req.body;

    try {
      await product.findOneAndUpdate(
        { _id: id },
        { title, category, price, description }
      );
      return res.status(200).send({
        message: "Product Updated",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to update product",
      });
    }
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    const { owner_id } = req.body;
    const findProduct = await product.findById(id);
    if (!findProduct) {
      return res.status(404).send({
        message: "Product not found",
      });
    }
    if (findProduct.owner !== owner_id) {
      res.status(403).send({
        message: "User not authorized to delete this product.",
      });
    }
    await product.deleteOne({ _id: id });
    return res.status(200).send({
      message: "Product deleted",
    });
  }
}
