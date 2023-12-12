import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized / no token",
    });
  }
}

