
// server/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const user = new User({ name, email, password });
    await user.save();
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true }).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true }).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

router.get("/auth", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json(null);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json(null);
  }
});

module.exports = router;
