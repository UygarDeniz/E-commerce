import express from "express";
import { 
    addProduct,
    getAllProducts,
    getLatestProducts,
    getProductById
} from "../controllers/productController.js"
const router = express.Router();

router.post("/", addProduct)
router.get("/", getAllProducts)
router.get("/latest", getLatestProducts)
router.get("/:id", getProductById)
export default router;