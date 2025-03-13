
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
  console.log("Signup hit");
  try {
    console.log("Signup hit 2");

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user with hashed password
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true }).json({ message: "User created successfully" });

    console.log("User saved:", user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  console.log("login hit 1")
  try {
    console.log("login hit 2")
    const { email, password } = req.body;
    console.log(email,password)
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,  // Use true if using HTTPS, false if HTTP
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Logged out successfully" });
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
