import express from "express";
import { 
    register,
    login, 
    logout,
    getUserProfile,
    updateUserProfile,
    changePassword
} from "../controllers/userController.js"
import { authUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile/:id",authUser, getUserProfile)
router.put("/profile/:id", authUser, updateUserProfile)
router.put("/profile/password/:id", authUser, changePassword)

export default router;