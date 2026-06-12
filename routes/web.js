const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, (req, res) => {
  res.render("home");
});

module.exports = router;