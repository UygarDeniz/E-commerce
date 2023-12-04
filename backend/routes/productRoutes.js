import express from "express";
import { 
    addProduct,
    getAllProducts,
    getLatestProducts
} from "../controllers/productController.js"
const router = express.Router();

router.post("/", addProduct)
router.get("/", getAllProducts)
router.get("/latest", getLatestProducts)
export default router;