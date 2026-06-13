const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// REGISTER
exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      errors: errors.array()
    });
  }

  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).render("register", {
        errors: [{ msg: "User already exists" }]
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed
    });

    res.redirect("/auth/login");

  } catch (err) {
    console.log(err);
    res.status(500).render("register", {
      errors: [{ msg: "Server error" }]
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("login", {
      errors: errors.array()
    });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).render("login", {
        errors: [{ msg: "User not found" }]
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).render("login", {
        errors: [{ msg: "Wrong password" }]
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);
    res.redirect("/");

  } catch (err) {
    console.log(err);
    res.status(500).render("login", {
      errors: [{ msg: "Server error" }]
    });
  }
};