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

const router = express.Router();

router.post("/", addProduct)
router.get("/", getAllProducts)
router.get("/latest", getLatestProducts)

router.get("/search/:keyword", getProductsBySearch)

router.get("/:id", getProductById)
router.put("/:id", editProduct)
router.delete("/:id", deleteProduct)

export default router;