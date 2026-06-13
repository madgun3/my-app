const router = require("express").Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

// GET pages
router.get("/login", (req, res) => {
  res.render("login", { errors: [] });
});

router.get("/register", (req, res) => {
  res.render("register", { errors: [] });
});

// POST REGISTER
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  authController.register
);

// POST LOGIN
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  authController.login
);

module.exports = router;