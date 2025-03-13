const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

console.log('code is running')
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);


const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("MongoDB connection error:", err));

  //2hU0MpCkKnM9tYuu