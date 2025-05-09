import { category } from "../models/category.model.js";
import { SQSService } from "../services/sqs.service.js";

const sqsService = new SQSService();

export class CategoryController {
  async createCategory(req, res) {
    try {
      const { title, owner, description } = req.body;
      await category.create({ title, owner, description });
      await sqsService.sendMessage(owner);
      return res.status(201).send({
        message: "Category created",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to create category",
      });
    }
  }
  async getCategoryById(req, res) {
    const { id } = req.params;

    const findCategory = await category.findById(id);

    if (!findCategory) {
      return res.status(404).send({
        message: "Category not found",
      });
    }
    await sqsService.sendMessage(findCategory.owner);
    return res.status(200).send(findCategory);
  }
  async updateCategory(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      const findCategory = await category.findOneAndUpdate(
        { _id: id },
        { title, description }
      );
      await sqsService.sendMessage(findCategory.owner);
      return res.status(200).send({
        message: "Category Updated",
      });
    } catch (error) {
      return res.status(500).send({
        message: "Failed to update category",
      });
    }
  }
  async deleteCategory(req, res) {
    const { id } = req.params;
    const { owner_id } = req.body;
    const findProduct = await category.findById(id);
    await sqsService.sendMessage(findProduct.owner);
    if (!findProduct) {
      return res.status(404).send({
        message: "Category not found",
      });
    }
    if (findProduct.owner !== owner_id) {
      res.status(403).send({
        message: "User not authorized to delete this category.",
      });
    }
    await category.deleteOne({ _id: id });
    return res.status(200).send({
      message: "Category deleted",
    });
  }
}
