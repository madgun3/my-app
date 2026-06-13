exports.index = (req, res) => {
  res.render("home", {
    title: "Home Page",
    user: req.user || null
  });
};


exports.view = (req, res) => {
  res.render("view");
};


exports.users = (req, res) => {
  res.render("users");
};

