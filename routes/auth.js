const router = require("express").Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;