exports.index = (req, res) => {
  res.render("home", {
    title: "Home Page",
    user: req.user || null
  });
};