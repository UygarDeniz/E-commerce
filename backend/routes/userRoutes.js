import express from "express";
import { 
    register,
    login, 
    logout,
    getUserProfile,
    updateUserProfile,
    changePassword
} from "../controllers/userController.js"

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile/:id", getUserProfile)
router.put("/profile/:id", updateUserProfile)
router.put("/profile/password/:id", changePassword)

export default router;