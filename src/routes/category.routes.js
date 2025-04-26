import express from "express";
import { CategoryController } from "../controllers/category.controller.js";

const router = express.Router();

const categoryController = new CategoryController();

router.post("/", categoryController.createCategory);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
