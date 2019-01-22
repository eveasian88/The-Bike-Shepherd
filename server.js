//require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
//var morgan = require("morgan");
var passport = require("passport");
var Strategy = require("passport-local").Strategy;
//var session = require("express-session");
//var bodyParser = require("body-parser");
//var env = require("dotenv").load();
var db = require("./models");

var PORT = process.env.PORT || 3000;

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

//app.use(express.json());
app.use(express.static("public"));

// Routes
//require("./routes/apiRoutes")(app);
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
        model: "Vulture"
      },
      {
        username: "scott",
        bikeNickname: "Rodeit",
        color: "gloss metallic red",
        brand: "Haro",
        serialNumber: "aksjdflkdsj",
        model: "Downtown"
      },
      {
        username: "michael",
        bikeNickname: "Fixie",
        color: "Barcelona",
        brand: "6KU",
        serialNumber: "465sfa4d",
        model: "Fixie"
      },
      {
        username: "james",
        bikeNickname: "Janky Jumper",
        color: "black",
        brand: "Norco",
        serialNumber: "jsalfkj32",
        model: "Sight Carbon"
      },
      {
        username: "susye",
        bikeNickname: "Road Bike",
        color: "turquoise",
        brand: "Bianchi",
        serialNumber: "lajksdhf23",
        model: "Via Nirone Dama Sora"
      }
    ])
    .then(bikes => {
      console.log(bikes);
      db.user
        .bulkCreate([
          {
            username: "scott",
            password: "1234",
            displayName: "Scott",
            email: "scott@email.com"
          },
          {
            username: "susye",
            password: "abcd",
            displayName: "Susye",
            email: "susye@email.com"
          },
          {
            username: "james",
            password: "5678",
            displayName: "James",
            email: "james@email.com"
          },
          {
            username: "michael",
            password: "password",
            displayName: "Michael",
            email: "michael@email.com"
          }
        ])
        .then(users => {
          console.log(users);
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
