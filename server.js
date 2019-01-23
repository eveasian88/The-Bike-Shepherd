require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//var morgan = require("morgan");
var passport = require("passport");
// var Strategy = require("passport-local").Strategy;
//var session = require("express-session");
//var bodyParser = require("body-parser");
// var env = require("dotenv").load();
var db = require("./models");

const PORT = process.env.PORT || 3000;
var app = express();
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: true
};

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true; // I've set force sync true here to make development easier - in case we update Schema. -Scott
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  db.bike
    .bulkCreate([
      {
        username: "scott",
        bikeNickname: "Silver Bullet",
        color: "silver",
        brand: "Upland",
        serialNumber: "123456",
        model: "Vulture",
        stolen: true
      },
      {
        username: "scott",
        bikeNickname: "Rodeit",
        color: "gloss metallic red",
        brand: "Haro",
        serialNumber: "aksjdflkdsj",
        model: "Downtown",
        stolen: false
      },
      {
        username: "michael",
        bikeNickname: "Fixie",
        color: "Barcelona",
        brand: "6KU",
        serialNumber: "465sfa4d",
        model: "Fixie",
        stolen: false
      },
      {
        username: "james",
        bikeNickname: "Janky Jumper",
        color: "black",
        brand: "Norco",
        serialNumber: "jsalfkj32",
        model: "Sight Carbon",
        stolen: false
      },
      {
        username: "susye",
        bikeNickname: "Road Bike",
        color: "turquoise",
        brand: "Bianchi",
        serialNumber: "lajksdhf23",
        model: "Via Nirone Dama Sora",
        stolen: false
      }
    ])
    .then(() => {
      db.user
        .bulkCreate([
          {
            username: "scott",
            password: "$2a$08$6EllQYtdt3KPLYEjRC88TumPCPJkgxYBEWIsj0cK84SnbHZeLfrbS", //1234
            displayName: "Scott",
            email: "scott@email.com"
          },
          {
            username: "susye",
            password: "$2a$08$3Yn8YRYFHVyrS1.hD7/lCeKnkjNS.7U979whxeCgpwvOQhOMwgjti", // abcd
            displayName: "Susye",
            email: "susye@email.com"
          },
          {
            username: "james",
            password: "$2a$08$ZrMJp8B./ULRGx6he0akj.myCqSU7P8jhXtygRqEzWpDHXUy.ixWC", //5678
            displayName: "James",
            email: "james@email.com"
          },
          {
            username: "michael",
            password: "$2a$08$vPfJjT0vGG41R762QppQc.lmwWW7DFpK.tM8gAeZ2Dak.TjgviQ1G", //password
            displayName: "Michael",
            email: "michael@email.com"
          }
        ])
        .then(() => {
          //console.log(users);
          app.listen(PORT, () => {
            console.log(
              "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
              PORT,
              PORT
            );
          });
        });
    });
});

module.exports = app;
