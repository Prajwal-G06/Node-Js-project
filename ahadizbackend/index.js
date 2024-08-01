const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/userModel");

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/nodedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST route to create a new user
app.post("/users", async (req, res) => {
  console.log("Received user data:", req.body);
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find a user with the given userName and password
    const user = await User.findOne({ userName, password });
    if (user) {
      // User found, login successful
      res.status(200).json({ message: "Login successful", user });
    } else {
      // User not found or incorrect password
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
