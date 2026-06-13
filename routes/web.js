const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const homeController = require("../controllers/homeController");
router.get("/", auth,(req, res) => {
  res.render("home");
});

router.get("/view", homeController.view);

router.all("/users",homeController.users)

module.exports = router;