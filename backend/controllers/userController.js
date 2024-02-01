import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide all fields",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, { httpOnly: true });

      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
      });
    } else {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logged out",
  });
};
