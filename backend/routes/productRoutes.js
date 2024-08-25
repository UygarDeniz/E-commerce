import express from "express";
import { 
    addProduct,
    editProduct,
    getAllProducts,
    getLatestProducts,
    getProductById,
    deleteProduct,
    getProductsBySearch
} from "../controllers/productController.js"

import { authUser } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authUser, addProduct)
router.get("/",  getAllProducts)
router.get("/latest", getLatestProducts)

router.get("/search/:keyword", getProductsBySearch)

router.get("/:id", getProductById)
router.put("/:id", authUser ,editProduct)
router.delete("/:id", authUser, deleteProduct)

export default router;