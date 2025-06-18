import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller.js";

const router = express.Router();

router.post("/create-category", createCategory);

router.get("/category", getCategories);

// Route to get a category by its ID
router.get("/category/:id", getCategoryById);

// Route to update a category
router.put("/category/:id", updateCategory);

// Route to delete a category
router.delete("/category/:id", deleteCategory);

export default router;
