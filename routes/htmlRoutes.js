//var db = require("../models");

// Middleware function example
function isAuthorized(req, res, next) {
  // check for user object
  // if (!req.user) {
  //   return res.redirect("/login");
  // }
  next();
}

module.exports = app => {
  // Load index page
  app.get("/", isAuthorized, (req, res) => {
    // db.Example.findAll({}).then(dbExamples => {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
    res.render("index");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/registration", (req, res) => {
    res.render("registration");
  });

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
