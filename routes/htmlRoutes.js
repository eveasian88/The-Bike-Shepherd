//var db = require("../models");

module.exports = app => {
  // app.get("/login", (req, res) => {
  //   res.render("login");
  // });

  // app.get("/signup", (req, res) => {
  //   res.render("signup");
  // });

  // app.get("/register", (req, res) => {
  //   res.render("register");
  // });

  app.get("/services", (req, res) => {
    res.render("services");
  });

  app.get("/team", (req, res) => {
    res.render("team");
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", (req, res) => {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(dbExample => {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
