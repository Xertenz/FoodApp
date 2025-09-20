const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ error: "There are no users" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ error: "Error in fetching all users" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ error: "Email is already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      { email, id: newUser.__id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );
    return res.status(201).json({
      message: "User registered successfully",
      token,
      new_user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ error: "Error in user registeration" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      const token = jwt.sign(
        { email, id: userExist._id },
        process.env.SECRET_KEY,
        { expiresIn: "1w" }
      );
      return res.status(201).json({ token, user: userExist });
    } else {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Error in user signing in" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status({ error: "User not exist" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Error in fetching user" });
  }
});

module.exports = router;
