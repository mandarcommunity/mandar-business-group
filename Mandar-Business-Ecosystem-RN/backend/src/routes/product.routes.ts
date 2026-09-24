import express from "express";
import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getBusinessProducts,
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

/* CREATE PRODUCT */
router.post("/", protect, createProduct);

/* GET MY PRODUCTS */
router.get("/me", protect, getMyProducts);

/* GET BUSINESS PRODUCTS */
router.get("/business/:businessId", protect, getBusinessProducts);

/* UPDATE PRODUCT */
router.put("/:id", protect, updateProduct);

/* DELETE PRODUCT */
router.delete("/:id", protect, deleteProduct);

export default router;
